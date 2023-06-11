import Verse from '@/components/Verse';
import VerseHeader from '@/components/VerseHeader';
import { getXataClient } from '@/src/xata';
import Sanscript from '@indic-transliteration/sanscript';
import Link from 'next/link';
import latinize from 'latinize';

const xata = getXataClient();

type SearchPageProps = {
  searchParams: SearchPageSearchParams;
};

type SearchPageSearchParams = {
  q: string;
  offset: string;
};
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const results = await getSearchData(
    decodeURI(searchParams.q),
    decodeURI(searchParams.offset) || '0'
  );
  return (
    <div className='grid grid-flow-row rounded p-6 m-6 '>
      {results?.map((verse) => {
          const book = latinize(Sanscript.t(verse?.book || '', 'hk', 'iast'));
          // @ts-ignore
          let engtext = verse.xata.highlight.engtext?.[0]; 
          // @ts-ignore
          const text = verse.xata.highlight.text?.[0];
          const finalText = text ? text : Sanscript.t(engtext, 'itrans', 'devanagari', { skip_sgml: true})

        return (
          <>
            <Link
              href={`/book/${verse.book}/${verse.bookContext}`}
              className='p-4 ml-5 hover:bg-teal-500 group w-full rounded-md grid grid-flow-col items-center'
            >
              <div className='flex flex-row items-center columns-2'>
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
  );
};

const getSearchData = async (query: string, offset: string = '0') => {
  const records = await xata.db.lines.search(query, {
    fuzziness: 2,
    prefix: 'phrase',
    page: {
      size: 20,
      offset: +offset,
    },
  });
  return records;
};

export default SearchPage;
