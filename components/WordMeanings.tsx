import React from 'react';

const WordMeanings = ({ words, className = '' }) => {
    return (
      <div className={`text-gray-600 text-xl ${className}`}>
        {words?.meanings?.map((word: { sanskrit: string; english: string; }, index: number) => (
          <span key={index} className="mr-2">
            <span className="font-semibold">{word.sanskrit}</span>: <span className='italic'>{word.english}</span>
            {index < words.length - 1 ? ', ' : ' '}
          </span>
        ))}
      </div>
    );
  };
  
  
export default WordMeanings;
