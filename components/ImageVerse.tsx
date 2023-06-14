import React from 'react';
import Sanscript from '@indic-transliteration/sanscript';
function splitStringIntoChunks(str: string, length: number) {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += length) {
    chunks.push(str.slice(i, i + length));
  }
  return chunks;
}
const ImageVerse = ({ verse, tw = '' }) => {
  const finalText = Sanscript.t(verse?.text, 'devanagari', 'iast');
  return (
    <div tw={`flex flex-col text-gray-700 text-xl ${tw}`}>
      {finalText.split('\n').map((line) => {
        // return splitStringIntoChunks(line, 3000).map((chunk) => (
        //   <div
        //     tw='flex flex-row'
        //     style={{ wordWrap: 'break-word' }}
        //     key={chunk}
        //   >
        //     {chunk}
        //   </div>
        // ));
        return (<div
          tw='flex'
          style={{ wordWrap: 'break-word' }}
          key={line}
        >
          {line}
        </div>);
      })}
    </div>
  );
};

export default ImageVerse;
