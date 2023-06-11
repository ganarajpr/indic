;import React from 'react';
import latinize from 'latinize';
import Sanscript from '@indic-transliteration/sanscript';
import Link from 'next/link';

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
      <div className={`hover:cursor-pointer group-hover:text-gray-800 text-teal-200 flex flex-row justify-center items-center ${className}`}>
      <span className='text-3xl  mb-2 pr-2 capitalize'>
        {book ? latinize(Sanscript.t(book, 'hk', 'iast')) : ''}
      </span>
      <span className='text-xl h-full'>{bookContext}</span>
    </div>
  );

  return LinkWrapper(link, content);
};

export default VerseHeader;
