import React from 'react';
import { LinesRecord } from '@/src/xata';
import latinize from 'latinize';
import Sanscript from '@indic-transliteration/sanscript';
import _ from 'lodash';
import Link from 'next/link';

const BookComponent = ({ data }: { data: LinesRecord | null }) => {
  const chapter = _.initial(data?.bookContext?.split('.')).join('.');

  return (
    <div className='flex flex-col items-center shadow-md rounded p-6 m-6'>
      <Link href={`/book/${data?.book}/chapter/${chapter}`}>
        <div className='hover:cursor-pointer'>
          <span className='text-3xl text-teal-500 mb-2 pr-2 capitalize'>
            {data?.book ? latinize(Sanscript.t(data.book, 'hk', 'iast')) : ''}
          </span>
          <span className='text-xl text-teal-500'>{data?.bookContext}</span>
        </div>
      </Link>
      <div className='text-gray-400 text-4xl mt-8'>
        {data?.text?.split('\n').map((line) => {
          return <div key={line}>{line}</div>;
        })}
      </div>
    </div>
  );
};

export default BookComponent;
