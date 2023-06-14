;import React from 'react';
import { convertForDisplay } from '@/utils/text';

type VerseHeaderProps = {
  book: string;
  bookContext?: string;
  link?: string;
    className?: string;
    tw?: string;
};
const ImagePageHeading = ({
    book,
    bookContext,
    tw = '',
}: VerseHeaderProps) => {
    const content = (
        <h1 tw={`flex flex-col justify-center rounded-md 
      capitalize mb-1 p-2 text-gray-700 items-center ${tw}`}>
      <span tw='text-3xl mb-2 pr-2 capitalize'>
        {book ? convertForDisplay(book) : ''}
      </span>
          {bookContext && <span tw='text-xl h-full'>{bookContext}</span>}
    </h1>
  );

  return content;
};

export default ImagePageHeading;
