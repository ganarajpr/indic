import SearchBar from '@/components/SearchBar';
import { getXataClient } from '@/src/xata';
import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import Sanscript from '@indic-transliteration/sanscript';
import GroupedBooks from './GroupedBooks';
import latinize from 'latinize';

const xata = getXataClient();

export default async function Home() {
  const books = await getData();
  return (
    <main className='flex flex-col items-center'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
        <SearchBar />
        <GroupedBooks books={books} />
      </div>
    </main>
  );
}


const getData = async () => {
  const bookSummary  = await xata.db.lines.summarize({
      columns: ['book'],
    summaries: {},
    pagination: {
      size:100
    }
  });
  const books = bookSummary.summaries?.map(item => item.book);
  const grouped = _.groupBy(books, (book) => {
      book = latinize(Sanscript.t(book || '', 'hk', 'iast'));
      return book.toLowerCase().charCodeAt(0);
  });
  return grouped;
};
