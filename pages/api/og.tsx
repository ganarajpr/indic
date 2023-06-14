import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import ImagePageHeading from '@/components/ImagePageHeading';
import ImageVerse from '@/components/ImageVerse';
import { getXataClient } from '@/src/xata';


const xata = getXataClient();

export const config = {
  runtime: 'edge',
};

export const getVerseData = async (book: string, bookContext: string) => {
    const record = await xata.db.lines
      .filter({ book, bookContext })
      .select(['book', 'text', 'bookContext', 'sequence'])
      .getFirst();
    return record;
  };


export type VerseParams = { book: string; bookContext: string }

export type VerseProps = {
  params: VerseParams
}
export default async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
 
    const hasBook = searchParams.has('book');
    const book = hasBook
      ? decodeURI( searchParams.get('book') || '' )
        : 'My default title';
    const hasContext = searchParams.has('bookContext');
    const bookContext = hasContext
        ? decodeURI(searchParams.get('bookContext') || '')
        : 'My default title';  
    const verse = await getVerseData(book, bookContext);
    console.log(verse);
    
    return new ImageResponse(
      (
        <div tw='flex flex-col items-center p-6 m-6'>
        <ImagePageHeading
          book={book || ''}
          bookContext={bookContext || ''}
          tw='self-center w-full'
        />
        {verse && <ImageVerse verse={verse} tw='mt-4'/>}
      </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
