import React from 'react';
import _ from 'lodash';

const Verse = ({ verse, text, className = '' }) => {
  const chapter = _.initial(verse?.bookContext?.split('.')).join('.');
  const finalText = text ? text : verse?.text;
  return (
    <div className={`text-gray-400 group-hover:text-gray-900 text-4xl ${className}`}>
        {finalText.split('\n').map((line) => {
          return <div className='line ' key={line} dangerouslySetInnerHTML={{ __html: line }}></div>;
        })}
      </div>
  );
};

export default Verse;
