'use client';
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation';

const SearchBar = ({text = ''}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    text && setSearchTerm(text);
  }, []);
  const handleSearchChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event:any) => {
    event.preventDefault();
    const book = params?.book ? params.book : '';

    if (searchTerm) {
      router.push(`/search?q=${searchTerm}${ book ? `&book=${book}` : '' }`);
    }
  };

  return (
    <div className="flex items-center justify-center py-4">
      <form className="w-full max-w-4xl" onSubmit={handleSearchSubmit}>
        <div className="flex items-center border-b border-fuchsia-950 py-1">
                  <input className="appearance-none bg-transparent border-none w-full text-fontColor mr-3 py-1 px-2 
                    leading-tight focus:outline-none focus:placeholder-transparent" type="text"
                      placeholder="ramayana or रामायण" aria-label="Search term" value={searchTerm} onChange={handleSearchChange} />
          <button className="flex-shrink-0 bg-fuchsia-950 hover:bg-gray-300 border-fuchsia-950
              border hover:border-2
              hover:border-fuchsia-900 hover:text-fuchsia-950
               text-sm text-gray-300 py-4 px-4 rounded-full" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
