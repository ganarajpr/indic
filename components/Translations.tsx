import React from 'react';

const Translations = ({ translations, className = '' }) => {
    return (
      <div className={`text-gray-500 text-2xl ${className}`}>
        {translations.map((line: { translation: string ; }, index: number) => (
          <div key={index} className="translation my-2">
            {line.translation}
          </div>
        ))}
      </div>
    );
};
  
export default Translations;
