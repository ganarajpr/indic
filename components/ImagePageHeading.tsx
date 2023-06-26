import React from 'react';
import { convertForDisplay } from '@/utils/text';

type VerseHeaderProps = {
  book: string;
  bookContext?: string;
  link?: string;
  className?: string;
  tw?: string;
};

const ImagePageHeading = ({ book, bookContext, tw = '' }: VerseHeaderProps) => {
  const content = (
    <div
      tw={`flex flex-col justify-center bg-[#4a044e] 
      capitalize mb-1 p-2 text-gray-300 items-center ${tw}`}
    >
      <span tw='text-3xl mb-2 pr-2 capitalize flex'>
        {book ? convertForDisplay(book) : ''}
      </span>
      <span tw='text-xl h-full flex'>{bookContext}</span>
    </div>
  );

  return content;
};

export default ImagePageHeading;
