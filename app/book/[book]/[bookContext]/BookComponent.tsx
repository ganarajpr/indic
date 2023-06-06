import React from 'react';
import { LinesRecord } from "@/src/xata"
import Sanscript from '@indic-transliteration/sanscript';

const BookComponent = ({ data }: { data: LinesRecord | null }) => {
    console.log(data?.text);
  return (
    <div className="flex flex-col items-center shadow-md rounded p-6 m-6">
          <div>
              <span className="text-3xl text-teal-500 mb-2 pr-2">
                {data?.book ? Sanscript.t(data.book, "hk", "iast") : ""}
              </span>
              <span className="text-xl text-teal-500">{data?.bookContext}</span>
          </div>
          <div className="text-gray-400 text-4xl mt-8">
              {data?.text?.split('\n').map((line) => {
                  return <div key={line}>{line}</div>;
              }) }
          </div>
    </div>
  );
};

export default BookComponent;
