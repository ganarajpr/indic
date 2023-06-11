import SearchBar from '@/components/SearchBar';
import { getXataClient } from '@/src/xata';
import _ from 'lodash';
import Link from 'next/link';
const xata = getXataClient();

type BookPageProps = {
  params: BookPageParams;
};

type BookPageParams = {
  book: string;
  chapterNo: string;
};

const getBookContextList = (bookContexts, bookName) => {
  if (bookContexts?.length) {
    return _.map(bookContexts, (spl) => {
      return (
        <Link href={`/book/${bookName}/chapter/${spl}`} key={spl}>
          <div className='col-span-12 md:col-span-6 lg:col-span-3 shadow-md p-3 underline mb-2 cursor-pointer items-center justify-items-center hover:bg-teal-500 hover:text-gray-700'>
            <div className='text-lg text-center'>Chapter {spl}</div>
          </div>
        </Link>
      );
    });
  }
};

export default async function BookPage({ params }: BookPageProps) {
  const book = decodeURI(params.book);
  const chapters = await getChapterData(book);
  return (
    <main className='flex flex-col items-center'>
      <div
        className='z-10 w-full max-w-5xl items-center 
                justify-between font-mono text-sm'
      >
              <SearchBar />
              <div className='grid grid-flow-row'>
              {getBookContextList(chapters, book)}
              </div>
        
      </div>
    </main>
  );
}

const getChapterData = async (book: string) => {
  const bookChapterSummary = await xata.db.lines
    .filter('book', book)
    .summarize({
      columns: ['L1'],
      summaries: {},
      pagination: {
        size: 1000,
      },
    });
  return bookChapterSummary.summaries
    .map((item) => {
      return item?.L1 ? +item.L1 : 1;
    })
    .sort((a, b) => a-b);
};
