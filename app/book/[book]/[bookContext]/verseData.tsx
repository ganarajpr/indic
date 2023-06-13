
import { getXataClient } from '@/src/xata';
import { lt, gt } from "@xata.io/client";

const xata = getXataClient();


export const getVerseData = async (book: string, bookContext: string) => {
    const record = await xata.db.lines
      .filter({ book, bookContext })
      .select(['book', 'text', 'bookContext', 'sequence'])
      .getFirst();
    return record;
  };


export type VerseParams = { book: string; bookContext: string }

export type VerseProps = {
  params: VerseParams
}
