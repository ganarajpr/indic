import Verse from '@/components/Verse';
import _ from 'lodash';
import PageHeading from '@/components/PageHeading';
import {
  getVerseData,
  VerseProps,
} from '@/app/book/[book]/[bookContext]/verseData';

const VersePage = async ({ params }: VerseProps) => {
  const book = decodeURI(params.book);
  const bookContext = decodeURI(params.bookContext);
  const verse = await getVerseData(book, bookContext);
  const chapter = _.initial(verse?.bookContext?.split('.')).join('.');
  const link = `/book/${book}/chapter/${chapter}`;
  return (
    <>
      <div className='flex flex-col items-center rounded p-6 m-6'>
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
          <div className='absolute top-0 left-0 h-full w-full flex justify-center items-center'>
              <img src='/logo.png' width={300} className='opacity-25'></img>
          </div>
    </>
  );
};

export default VersePage;
