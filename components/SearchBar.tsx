'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); 
  const handleSearchChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event:any) => {
    event.preventDefault();
    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <div className="flex items-center justify-center py-4">
      <form className="w-full max-w-4xl" onSubmit={handleSearchSubmit}>
        <div className="flex items-center border-b-2 border-teal-500 py-4">
                  <input className="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 
                    leading-tight focus:outline-none focus:placeholder-transparent" type="text"
                      placeholder="ramayana or रामायण" aria-label="Search term" value={searchTerm} onChange={handleSearchChange} />
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
