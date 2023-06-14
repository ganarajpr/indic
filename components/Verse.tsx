import React from 'react';
import _ from 'lodash';

const Verse = ({ verse, text = null, className = '' }) => {
  const chapter = _.initial(verse?.bookContext?.split('.')).join('.');
  const finalText = text ? text : verse?.text;
  return (
    <div className={`text-gray-700 group-hover:text-gray-300 text-4xl ${className}`}>
        {finalText.split('\n').map((line) => {
          return <div className='line break-all' key={line} dangerouslySetInnerHTML={{ __html: line }}></div>;
        })}
      </div>
  );
};

export default Verse;
