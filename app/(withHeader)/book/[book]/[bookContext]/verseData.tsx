import { getXataClient } from '@/src/xata';
import { extractSequence } from '@/utils/text';
import OpenAI from 'openai';

const openAiClient = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET,
});
const xata = getXataClient();

export const getVerseData = async (book: string, bookContext: string) => {
  const sequence = extractSequence(bookContext);
  const record = await xata.db.lines
    .filter({ book, sequence })
    .select(['book', 'text', 'bookContext', 'sequence', 'id'])
    .getFirst();
  return record;
};

const getTranslationAndWords = async (verseId: string) => {
  const [translations, wordMeanings] = await Promise.all([
    xata.db.translations
      .select(['translation'])
      .filter({ line: verseId })
      .getMany(),
    xata.db.words
      .select(['meanings'])
      .filter({ line: verseId })
      .getFirst()
  ]);

  return { translations, words: {
    meanings: typeof wordMeanings?.meanings === 'string' ? JSON.parse(wordMeanings.meanings) : []
  } };
};

export const getTranslation = async (book: string, bookContext: string) => {
  const sequence = extractSequence(bookContext);
  const record = await xata.db.translations
    .select(['translation'])
    .filter({
      'line.book': book,
      'line.sequence': sequence,
    })
    .getMany();
  const verse = await getVerseData(book, bookContext);
  if (!verse) {
    return null;
  }
  if (!record.length) {
    const translationResponse = await translateSanskrit(verse?.text);
    if (!translationResponse.error) {
      await Promise.all([
        xata.db.translations.create({
          line: verse.id,
          translation: translationResponse.translation,
          commentary: translationResponse.commentary,
        }),
        xata.db.words.create({
          line: verse.id,
          meanings: JSON.stringify(translationResponse.words),
        }),
      ]);
    }
  }
  return getTranslationAndWords(verse.id);
};

interface SanskritTranslationResponse {
  translation?: string;
  commentary?: string;
  words?: [{ english: string; sanskrit: string }];
  error?: string;
}

async function translateSanskrit(
  sanskritText: string | null | undefined
): Promise<SanskritTranslationResponse> {
  if (!sanskritText) {
    return { error: 'No Sanskrit text provided' };
  }
  try {
    console.log('calling openai api');
    const response = await openAiClient.chat.completions.create({
      model: 'gpt-3.5-turbo', // Replace with the latest model if needed
      messages: [
        {
          role: 'system',
          content: `{
        "task": "Translate Sanskrit to English in JSON.",
        "details": {
          "on_input": "Provide translation, commentary ( only if sanskrit verse recognized ) and unique words translated in order.",
          "invalid_input": "Return JSON with 'error' message."
          },
        "expected_json_schema": {
          translation: string,
          commentary: string | null,
          words : [{sanskrit: string, english: string}]
        }
        }`,
        },
        {
          role: 'user',
          content: `${sanskritText}`,
        },
      ],
    });

    const result = response.choices?.[0]?.message.content;
    if (!result) {
      return { error: 'Failed to get a response from OpenAI' };
    }

    // Process the result to fit into the SanskritTranslationResponse format
    // This is a simplified version; you might need a more sophisticated method to parse the response
    const translationResponse: SanskritTranslationResponse = JSON.parse(result);

    return translationResponse;
  } catch (error) {
    console.log('openai error', error);
    return { error: 'Error processing the request' };
  }
}

export type VerseParams = { book: string; bookContext: string };

export type VerseProps = {
  params: VerseParams;
};
