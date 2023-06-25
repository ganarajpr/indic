import NavigationButtons from '@/components/NavigationButtons';
import PageHeading from '@/components/PageHeading';
import Verse from '@/components/Verse';
import VerseHeader from '@/components/VerseHeader';
import { getXataClient } from '@/src/xata';
import { lt, gt } from '@xata.io/client';
import Link from 'next/link';
import { Props } from '@/types/metadata';
import { ChapterPageProps } from '@/types/chapter';
import { Metadata } from 'next';
import { convertForDisplay, extractBookContext } from '@/utils/text';

const xata = getXataClient();

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const book = decodeURI(params.book);
  const { chapter, chapterIndex } = await getChapterData(
    book,
    decodeURI(params.chapterNo)
  );
  const [prevVerse, nextVerse] = await Promise.all([
    getPrevContext(book, chapter[0]?.sequence || 0),
    getNextContext(book, chapter[chapter.length - 1]?.sequence || 0),
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
  const bc = extractBookContext(chapterNo);
  const record = await xata.db.lines
    .filter('book', book)
    .filter(bc)
    .sort('sequence', 'asc')
    .select(['bookContext'])
    .getFirst();
  const levels = record?.bookContext?.split('.').map(t => +t);
  const chapterLevels = levels?.slice(0, levels.length - 1).join('.');
  const records = await xata.db.lines
    .filter('book', book)
    .filter(bc)
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


export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  
  const book = decodeURI(params.book || '');
  const chapterNo = decodeURI(params.chapterNo || '');
  const { chapterIndex } = await getChapterData(
    book,
    chapterNo
  );
 
  return {
    title: `${convertForDisplay(book)} Chapter ${chapterIndex}`,
    description: 'Indic Sanskrit Literature'
  }
}

export default ChapterPage;
