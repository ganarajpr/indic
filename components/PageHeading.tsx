;import React from 'react';
import Link from 'next/link';
import { convertForDisplay } from '@/utils/text';

type VerseHeaderProps = {
  book: string;
  bookContext?: string;
  link?: string;
  className?: string;
};

const LinkWrapper = (link: string | undefined, content: React.JSX.Element) => {
    return link ? <Link className='flex flex-col w-full' href={link}>{content}</Link> : content;
};
const PageHeading = ({
    book,
    bookContext,
    link,
    className = '',
}: VerseHeaderProps) => {
    const content = (
        <h1 className={`${link ? 'hover: cursor-pointer' : ''} flex flex-row justify-center rounded-md 
      capitalize mb-2 p-3 text-2xl
      bg-fuchsia-950 text-gray-300 items-center ${className}`}>
      <span className='text-3xl  mb-2 pr-2 capitalize'>
        {book ? convertForDisplay(book) : ''}
      </span>
          {bookContext && <span className='text-xl h-full'>{bookContext}</span>}
    </h1>
  );

  return LinkWrapper(link, content);
};

export default PageHeading;
