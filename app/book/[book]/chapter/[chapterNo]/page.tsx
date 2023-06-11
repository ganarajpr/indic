import Verse from '@/components/Verse';
import VerseHeader from '@/components/VerseHeader';
import { getXataClient, LinesRecord } from '@/src/xata';
import { startsWith } from '@xata.io/client';
import Link from 'next/link';
const xata = getXataClient();

type ChapterResponse = {
  book: string;
  bookContext: string;
  text: string;
};

type ChapterData = {
  chapter: ChapterResponse[] | null;
  chapterIndex: string;
};

type ChapterPageProps = {
  params: ChapterPageParams;
};

type ChapterPageParams = {
  book: string;
  chapterNo: string;
};
const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { chapter, chapterIndex }: ChapterData = await getChapterData(
    decodeURI(params.book),
    decodeURI(params.chapterNo)
  );
  return (
    <div className='flex flex-col items-start rounded p-6 m-6 '>
      <VerseHeader
        book={chapter[0]?.book || ''}
        bookContext={chapterIndex}
        link={`/book/${decodeURI(params.book)}`}
        className='justify-self-center self-center'
      />
      {chapter?.map((verse) => {
        return (
          <>
            <Link
              href={`/book/${verse.book}/${verse.bookContext}`}
              className='p-4 ml-5 hover:bg-teal-500 group w-full rounded-md flex flex-row items-center'
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
  );
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
    .filter('bookContext', startsWith(chapterLevels+ "." || '1'))
    .sort('sequence', 'asc')
    .select(['book', 'text', 'bookContext'])
    .getAll({
      consistency: "eventual",
      // pagination:{size: 1000}
    });
  return { chapterIndex: chapterLevels, chapter: records };
};

export default ChapterPage;
