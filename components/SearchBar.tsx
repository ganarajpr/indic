'use client';
import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event:any) => {
    event.preventDefault();
    console.log(searchTerm); // Here you can implement your search logic
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form className="w-full max-w-sm" onSubmit={handleSearchSubmit}>
        <div className="flex items-center border-b-2 border-teal-500 py-2">
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
