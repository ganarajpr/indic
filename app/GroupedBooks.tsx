import React from 'react';
import Link from 'next/link';
import Sanscript from '@indic-transliteration/sanscript';
const GroupedBooks = ({ books }) => {
  return (
    <div className="p-6">
      {Object.entries(books).map(([letter, items]) => (
        <div key={letter} className="mb-6">
          <h2 className="bg-teal-500 text-gray-700 py-2 px-3 rounded-md text-2xl mb-2">{String.fromCharCode(+letter).toUpperCase()}</h2>
          <ul>
            {items.map(item => (
              <li key={item} className="py-2 px-3">
                    <Link href={`/book/${item}`}
                        className="text-gray-700 hover:text-teal-500 capitalize text-xl">
                        {Sanscript.t(item, 'hk', 'devanagari')}
                        {" ("+Sanscript.t(item, 'hk', 'iast')+")"}  
                        
                    </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroupedBooks;
