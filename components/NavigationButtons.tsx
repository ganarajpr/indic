import React from 'react';
import ChevronLeftButton from './ChevronLeftButton';
import ChevronRightButton from './ChevronRightButton';
import Link from 'next/link';

type NavigationButtonProps = {
    book: string,
    prevContext?: string | null,
    nextContext?: string | null
};

const NavigationButtons = ({book, prevContext, nextContext}:NavigationButtonProps) => {
  return (
    <div className="grid grid-flow-col w-full h-16 border-4 bottom-0 fixed bg-fuchsia-950 text-gray-300">
            { prevContext &&
                <Link href={`/book/${book}/${prevContext}`}>
                  <ChevronLeftButton data-test="prevContext" className="justify-self-start 
                        grid grid-flow-col place-items-center text-xl font-bold ml-5 p-3 rounded-md h-full
                         hover:bg-gray-300 hover:text-fuchsia-950">Previous</ChevronLeftButton>            
                </Link>
                }
                {
                nextContext && 
                <Link href={`/book/${book}/${nextContext}`} className="justify-self-end">
                      <ChevronRightButton data-test="nextContext"
                          className="justify-self-end grid grid-flow-col place-items-center h-full 
                          font-bold text-2xl mr-5 p-3 hover:bg-gray-300 hover:text-fuchsia-950">Next</ChevronRightButton>            
                </Link>
                }
    </div>
  );
};

export default NavigationButtons;
