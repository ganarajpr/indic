import { getXataClient, LinesRecord } from '@/src/xata';
import Verse from '@/components/Verse';
import _ from 'lodash';
import PageHeading from '@/components/PageHeading';
const xata = getXataClient();

const VersePage = async ({
  params,
}: {
  params: { book: string; bookContext: string };
  }) => {
  
  const book = decodeURI(params.book);
  const bookContext = decodeURI(params.bookContext);
  const verse: LinesRecord | null = await getVerseData(
    book,
    bookContext
  );
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
      {verse && <Verse verse={verse} className='mt-4' />}
    </div>
  );
};

const getVerseData = async (book: string, bookContext: string) => {
  const record: LinesRecord | null = await xata.db.lines
    .filter({ book, bookContext })
    .getFirst();
  return record;
};

export default VersePage;
