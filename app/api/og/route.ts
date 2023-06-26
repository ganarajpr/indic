import { NextResponse } from 'next/server'
import { getScreenshot } from '../../../utils/chrome/chromium';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const book = searchParams.get('book');
  const bookContext = searchParams.get('bookContext'); 
  const baseUrl = process.env.NEXTAUTH_URL;
  const url = `${baseUrl}/embed/${book}/${bookContext}`;
  console.log(book, bookContext, url);
  const file = await getScreenshot(url, true);
  const headers = new Headers();
  headers.set('Content-Type', `image/jpeg`);

  //@ts-ignore
  return new NextResponse(file, { status: 200, statusText: "OK", headers });
  
}
