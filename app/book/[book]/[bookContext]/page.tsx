import { getXataClient, LinesRecord } from "@/src/xata"
import Verse from "@/components/Verse";
import VerseHeader from "@/components/VerseHeader";
import _ from 'lodash';

const xata = getXataClient();

const VersePage = async ({ params }: { params: { book: string; bookContext: string; } }) => {
  const verse: LinesRecord | null = await getVerseData(decodeURI(params.book), decodeURI(params.bookContext));
  const chapter = _.initial(verse?.bookContext?.split('.')).join('.');
  const link = `/book/${verse?.book}/chapter/${chapter}`;
    return (
      <div className="flex flex-col items-center shadow-md rounded p-6 m-6">
        {verse && <VerseHeader book={verse?.book || ''} bookContext={verse?.bookContext || ''} link={link}/>}
        {verse && <Verse verse={verse} className="mt-4" />}
      </div>
    );
};

const getVerseData = async (book: string, bookContext: string) => {
  const record: LinesRecord | null = await xata.db.lines
    .filter({ book, bookContext })
    .getFirst();
    return record;
}

export default VersePage;
