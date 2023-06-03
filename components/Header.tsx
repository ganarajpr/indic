'use client';
import React from 'react';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const handleUserIconClick = async () => {
    await signIn();
  };

  return (
    <header className="flex items-center justify-between py-2 border-b-2 border-teal-500">
      <div className="flex justify-center flex-1">
        <div className="mx-auto">
          <Image className="h-8 w-auto" width={50} height={30}  src="/smrthi-text.png" alt="Smrthi" /> 
        </div>
      </div>

      <button 
              className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:rounded-full rounded-full 
            hover:text-white py-2 px-3 border border-teal-500 hover:border-transparent mr-2"
        onClick={handleUserIconClick}
      >
                                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                        />
                    </svg>
      </button>
    </header>
  );
};

export default Header;
