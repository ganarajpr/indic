import Verse from '@/components/Verse';
import VerseHeader from '@/components/VerseHeader';
import { getXataClient } from '@/src/xata';
import Sanscript from '@indic-transliteration/sanscript';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { convertForDisplay } from '@/utils/text';
import { Metadata } from 'next'

const xata = getXataClient();

type SearchPageProps = {
  searchParams: SearchPageSearchParams;
};

type SearchPageSearchParams = {
  q: string;
  book: string;
  offset: string;
};
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = decodeURI(searchParams.q);
  const book = searchParams.book ? decodeURI(searchParams.book) : '';
  const results = await getSearchData(
    query,
    book,
    decodeURI(searchParams.offset) || '0'
  );
  return (
    <div className='grid grid-flow-row rounded p-6 m-6'>
      <SearchBar text={decodeURI(searchParams.q)} />
      <div className='text-lg text-gray-400 p-4 ml-4'>
        Your search for <span className='italic text-gray-500'>{query} </span>
        { 
          book ? <><span>in </span><span className='capitalize text-gray-500'>{convertForDisplay(book)} </span></> : ''
        }
        {results?.totalCount ? `returned the following ${results.totalCount} results.` : 'returned NO results.'} 
      </div>
      <div className='divide-y-4 divide-slate-400/25'>
        {results?.records.map((verse) => {
          const book = convertForDisplay(verse?.book || '');
          // @ts-ignore
          let engtext = verse.xata.highlight.engtext?.[0];
          // @ts-ignore
          const text = verse.xata.highlight.text?.[0];
          const finalText = text
            ? text
            : Sanscript.t(engtext, 'itrans', 'devanagari', { skip_sgml: true });

          return (
            <>
              <Link
                href={`/book/${verse.book}/${verse.bookContext}`}
                      className='p-4 ml-5 hover:bg-fuchsia-950 
                group w-full rounded-md grid grid-flow-col items-center'
              >
                <div className='flex flex-row items-center columns-2 p-2'>
                  <div className='flex flex-col h-full justify-center basis-1/4'>
                    <VerseHeader
                      bookContext={book || ''}
                      className='mr-4 capitalize'
                    />
                    <VerseHeader
                      bookContext={verse?.bookContext || ''}
                      className='mr-4 col-span-9'
                    />
                  </div>
                  <Verse verse={verse} text={finalText} />
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

const getSearchData = async (query: string, book: string = '', offset: string = '0') => {
  const myFilter = book !== '' ? { book } : undefined;
  const records = await xata.db.lines.search(query, {
    fuzziness: 2,
    filter: myFilter,
    prefix: 'phrase',
    page: {
      size: 200,
      offset: +offset,
    },
  });
  return records;
};

type Props = {
  params: { book: string, bookContext: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  return {
    title: `Search results for ${searchParams.q}`,
    description: 'Search on Indic Sanskrit Literature',
  }
}

export default SearchPage;
