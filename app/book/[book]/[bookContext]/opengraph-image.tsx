import { ImageResponse } from 'next/server';
import { getVerseData, VerseProps } from './page';
export const runtime = 'edge';
import PageHeading from '@/components/PageHeading';
import Verse from '@/components/Verse';

export const alt = 'Verse of Sanskrit';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: VerseProps) {
  const book = decodeURI(params.book);
  const bookContext = decodeURI(params.bookContext);
  const verse = await getVerseData(book, bookContext);

  return new ImageResponse(
    (
        <div className='flex flex-col items-center shadow-md rounded p-6 m-6'>
        {verse && (
          <PageHeading
            book={book || ''}
            bookContext={bookContext || ''}
            className='justify-self-center self-center w-full'
          />
        )}
        {verse && <Verse verse={verse} className='mt-4' />}
      </div>
    ),
    {
      ...size,
    }
  );
}
