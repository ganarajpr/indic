import React from 'react';

const Commentary = ({ translations, className = '' }) => {
    return (
      <div className={`text-gray-500 text-2xl ${className}`}>
        {translations.map((line: { commentary: string ; }, index: number) => (
          <div key={index} className="translation my-2">
            {line.commentary}
          </div>
        ))}
      </div>
    );
};
  
export default Commentary;
