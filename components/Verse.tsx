import React from 'react';
import { LinesRecord } from '@/src/xata';
import latinize from 'latinize';
import Sanscript from '@indic-transliteration/sanscript';
import _ from 'lodash';
import Link from 'next/link';

type VerseProps = { verse: LinesRecord | null, className?: string };
const Verse = ({ verse, className = '' }: VerseProps ) => {
  const chapter = _.initial(verse?.bookContext?.split('.')).join('.');

  return (
    <div className={`text-gray-400 group-hover:text-gray-900 text-4xl mt-8 ${className}`}>
        {verse?.text?.split('\n').map((line) => {
          return <div key={line}>{line}</div>;
        })}
      </div>
  );
};

export default Verse;
