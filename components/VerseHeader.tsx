;import React from 'react';
import Link from 'next/link';
import { convertForDisplay } from '@/utils/text';

type VerseHeaderProps = {
  book?: string;
  bookContext: string;
  link?: string;
  className?: string;
};

const LinkWrapper = (link: string | undefined, content: React.JSX.Element) => {
    return link ? <Link className='flex flex-col w-full' href={link}>{content}</Link> : content;
};
const VerseHeader = ({
  book = '',
  bookContext,
  link,
  className = '',
}: VerseHeaderProps) => {
  const content = (
      <div className={`hover:cursor-pointer group-hover:text-gray-300 text-gray-700 flex flex-row justify-center items-center ${className}`}>
      <span className='text-3xl  mb-2 pr-2 capitalize'>
        {book ? convertForDisplay(book) : ''}
      </span>
      <span className='text-xl h-full'>{bookContext}</span>
    </div>
  );

  return LinkWrapper(link, content);
};

export default VerseHeader;
