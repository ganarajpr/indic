import { ImageResponse } from '@vercel/og';
import { getVerseData, VerseProps } from './verseData';
import ImagePageHeading from '@/components/ImagePageHeading';
import ImageVerse from '@/components/ImageVerse';
export const runtime = 'edge';
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
      <div tw='flex flex-col items-center p-6 m-6'>
        <ImageVerse verse={verse} tw='my-4' />
        <ImagePageHeading
          book={book || ''}
          bookContext={bookContext || ''}
          tw='w-full'
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
