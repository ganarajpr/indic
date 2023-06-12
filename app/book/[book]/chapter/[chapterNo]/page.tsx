import NavigationButtons from '@/components/NavigationButtons';
import PageHeading from '@/components/PageHeading';
import Verse from '@/components/Verse';
import VerseHeader from '@/components/VerseHeader';
import { getXataClient } from '@/src/xata';
import { startsWith, lt, gt } from '@xata.io/client';
import Link from 'next/link';
const xata = getXataClient();

type ChapterResponse = {
  book: string;
  bookContext: string;
  text: string;
};

type ChapterPageProps = {
  params: ChapterPageParams;
};

type ChapterPageParams = {
  book: string;
  chapterNo: string;
};
const ChapterPage = async ({ params }: ChapterPageProps) => {
  const book = decodeURI(params.book);
  const { chapter, chapterIndex } = await getChapterData(
    book,
    decodeURI(params.chapterNo)
  );
  const [prevVerse, nextVerse] = await Promise.all([
    getPrevContext(book, chapter[0].sequence || 0),
    getNextContext(book, chapter[chapter.length - 1].sequence || 0),
  ]);
  const prevChapter = getChapterContext(prevVerse?.bookContext);
  const nextChapter = getChapterContext(nextVerse?.bookContext);
  return (
    <>
      <div className='flex flex-col items-start rounded p-6 m-6 last:mb-5'>
        <PageHeading
          book={chapter[0]?.book || ''}
          bookContext={chapterIndex || ''}
          link={`/book/${decodeURI(params.book)}`}
          className='justify-self-center self-center w-full'
        />
        <select 
          className="appearance-none bg-transparent border-none w-full text-fontColor 
        mr-3 py-1 px-2 leading-tight focus:outline-none focus:placeholder-transparent"
      >
        <option value="">Please select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
        {chapter?.map((verse) => {
          return (
            <>
              <Link
                href={`/book/${verse.book}/${verse.bookContext}`}
                className='p-4 ml-5 hover:bg-fuchsia-950 
              group w-full rounded-md flex flex-row items-center'
              >
                <VerseHeader
                  bookContext={verse?.bookContext || ''}
                  className='mr-4'
                />
                <Verse verse={verse} />
              </Link>
            </>
          );
        })}
      </div>
      <NavigationButtons
        prevLink={prevChapter && `/book/${book}/chapter/${prevChapter}`}
        nextLink={nextChapter && `/book/${book}/chapter/${nextChapter}`}
      />
    </>
  );
};
const regex = /^(.*?)\.[^.]*$/;

const getChapterContext = (bookContext: string | null | undefined) => {
  const match = bookContext?.match(regex);
  return match && match[1];
};

const getChapterData = async (book: string, chapterNo: string) => {
  const record = await xata.db.lines
    .filter('book', book)
    .filter('bookContext', startsWith(chapterNo))
    .sort('sequence', 'asc')
    .select(['bookContext'])
    .getFirst();

  const levels = record?.bookContext?.split('.');
  const chapterLevels = levels?.slice(0, levels.length - 1).join('.');
  const records = await xata.db.lines
    .filter('book', book)
    .filter('bookContext', startsWith(chapterLevels + '.' || '1'))
    .sort('sequence', 'asc')
    .select(['book', 'text', 'bookContext', 'sequence'])
    .getAll({
      consistency: 'eventual',
    });
  return { chapterIndex: chapterLevels, chapter: records };
};

const getNextContext = async (book: string, sequence: number) => {
  return sequence
    ? xata.db.lines
        .filter('book', book)
        .filter('sequence', gt(sequence))
        .sort('sequence', 'asc')
        .select(['book', 'bookContext'])
        .getFirst()
    : null;
};

const getPrevContext = async (book: string, sequence: number) => {
  return sequence
    ? xata.db.lines
        .filter('book', book)
        .filter('sequence', lt(sequence))
        .sort('sequence', 'desc')
        .select(['book', 'bookContext'])
        .getFirst()
    : null;
};

export default ChapterPage;
