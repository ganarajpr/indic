import { getXataClient, LinesRecord } from '@/src/xata';
import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import Sanscript from '@indic-transliteration/sanscript';
const xata = getXataClient();

type BookSummary = {
  book: string;
};

type BookSummaryList = {
  summaries: BookSummary[];
};

const getBookForKey = (books, key) => {
    return books[key].map((book) => {
        return (
            <Link href={`/book/${book}`} key={book}>
                <div
                    className="col-span-12 shadow-md p-3 border cursor-pointer hover:bg-pink-900 hover:text-white"
                    key={book}
                >
                    <p className="text-lg">
                        {Sanscript.t(book, "hk", "devanagari")} /{" "}
                        {Sanscript.t(book, "hk", "iast")}
                    </p>
                </div>
            </Link>
        );
    });
};

const getBookList = (books) => {
    const keys = Object.keys(books);
    return keys.map((key) => {
        return (<>
            <div
                className="col-span-12 shadow-md p-3 border cursor-pointer bg-pink-900 text-white my-4"
                >{String.fromCharCode(+key).toUpperCase()}</div>
            {getBookForKey(books, key)}
        </>);
        
        });
};
const BookPage = async () => {
    const books = await getData();
    return (
      <>
            <Head>
                <title>Smrthi - Home</title>
                <meta
                    name="description"
                    content={"Books of Ancient Sanskrit/Indic Literature"}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.smrthi.com/`} />
                <meta property="og:title" content={`Smrithi - Home`} />
                <meta
                    property="og:description"
                    content={"Books of Ancient Sanskrit/Indic Literature"}
                />
                <meta
                    property="og:image"
                    content={`https://www.smrthi.com/logo.jpg`}
                />
                <meta property="twitter:card" content="summary" />
                <meta
                    property="twitter:url"
                    content={`https://www.smrthi.com/`}
                />
                <meta property="twitter:title" content={`Smrithi - Home`} />
                <meta
                    property="twitter:description"
                    content={"Smrithi - Home"}
                />
                <meta
                    property="twitter:image"
                    content={`https://www.smrthi.com/logo.jpg`}
                />
            </Head>
            <div className='flex flex-col items-center shadow-md rounded p-6 m-6'>
                {getBookList(books)}
            </div>
      </>
      
  );
};

const getData = async () => {
    const bookSummary  = await xata.db.lines.summarize({
        columns: ['book'],
        summaries: {},
    });
    const books = bookSummary.summaries?.map(item => item.book);
    const grouped = _.groupBy(books, (book) => {
        return book.toLowerCase().charCodeAt(0);
    });
  return grouped;
};

export default BookPage;
