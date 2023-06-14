import React from 'react';

function splitStringIntoChunks(str: string, length: number) {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += length) {
    chunks.push(str.slice(i, i + length));
  }
  return chunks;
}
const ImageVerse = ({ verse, tw = '' }) => {
  const finalText = verse?.text;
  return (
    <div tw={`flex flex-col text-gray-700 text-xl ${tw}`}>
      {finalText.split('\n').map((line) => {
        return splitStringIntoChunks(line, 3000).map((chunk) => (
          <div
            tw='flex flex-row'
            style={{ wordBreak: 'break-all' }}
            key={chunk}
          >
            {chunk}
          </div>
        ));
      })}
    </div>
  );
};

export default ImageVerse;
