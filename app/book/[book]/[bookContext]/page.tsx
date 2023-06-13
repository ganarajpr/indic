import { getXataClient } from '@/src/xata';
import Verse from '@/components/Verse';
import _ from 'lodash';
import PageHeading from '@/components/PageHeading';
import NavigationButtons from '@/components/NavigationButtons';
import { lt, gt } from "@xata.io/client";
import { Metadata, ResolvingMetadata } from 'next'
import { convertForDisplay } from '@/utils/text';

const xata = getXataClient();

const VersePage = async ({
  params,
}: {
  params: { book: string; bookContext: string };
  }) => {
  
  const book = decodeURI(params.book);
  const bookContext = decodeURI(params.bookContext);
  const verse = await getVerseData(
    book,
    bookContext
  );
  const [prevVerse, nextVerse] = await Promise.all([
    getPrevContext(book, verse?.sequence || 0),
    getNextContext(book, verse?.sequence || 0)
  ]);
  const chapter = _.initial(verse?.bookContext?.split('.')).join('.');
  const link = `/book/${book}/chapter/${chapter}`;
  return (
    <div className='flex flex-col items-center shadow-md rounded p-6 m-6'>
      {verse && (
        <PageHeading
          book={book || ''}
          bookContext={bookContext || ''}
          link={link}
          className='justify-self-center self-center w-full'
        />
      )}
      <NavigationButtons
        prevLink={prevVerse?.bookContext && `/book/${book}/${prevVerse.bookContext}`}
        nextLink={nextVerse?.bookContext && `/book/${book}/${nextVerse.bookContext}`} />
      {verse && <Verse verse={verse} className='mt-4' />}
    </div>
  );
};

const getVerseData = async (book: string, bookContext: string) => {
  const record = await xata.db.lines
    .filter({ book, bookContext })
    .select(['book', 'text', 'bookContext', 'sequence'])
    .getFirst();
  return record;
};

const getNextContext = async (book: string, sequence: number) => {
  return sequence ? xata.db.lines
  .filter("book", book)
  .filter("sequence", gt(sequence))
  .sort("sequence", "asc")
  .select(["book", "bookContext"])
  .getFirst(): null;
}

const getPrevContext = async (book: string, sequence: number) => {
  return sequence ? xata.db.lines
  .filter("book", book)
  .filter("sequence", lt(sequence))
  .sort("sequence", "desc")
  .select(["book", "bookContext"])
  .getFirst(): null;
}

type Props = {
  params: { book: string, bookContext: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  const book = decodeURI(params.book);
  const bookContext = decodeURI(params.bookContext);
  const verse = await getVerseData(
    book,
    bookContext
  );
 
  return {
    title: `${convertForDisplay(book)} ${bookContext}`,
    description: 'Indic Sanskrit Literature',
    twitter: {
      card: 'summary_large_image',
      title: `${convertForDisplay(book)} ${bookContext}`,
      description: `Verses of ${convertForDisplay(book)}`,
      images: [],
    },
    openGraph: {
      title: `${convertForDisplay(book)} ${bookContext}`,
      description: `Verses of ${convertForDisplay(book)} in Sanskrit`,
      url: `/book/${book}/${bookContext}`,
      images: []
    }
  }
}

export default VersePage;
