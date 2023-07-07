import { getXataClient } from '@/src/xata';
import { extractSequence } from '@/utils/text';
const xata = getXataClient();


export const getVerseData = async (book: string, bookContext: string) => {
  const sequence = extractSequence(bookContext);
    const record = await xata.db.lines
      .filter({ book, sequence })
      .select(['book', 'text', 'bookContext', 'sequence'])
      .getFirst();
    return record;
  };


export type VerseParams = { book: string; bookContext: string }

export type VerseProps = {
  params: VerseParams
}
