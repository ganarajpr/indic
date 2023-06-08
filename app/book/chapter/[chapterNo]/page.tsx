import { getXataClient, LinesRecord } from "@/src/xata"
const xata = getXataClient();

const ChapterPage = async ({ params }: { params: { book: string; bookContext: string; } }) => {
    const data: LinesRecord | null = await getData(params.book, params.bookContext);
    return (
      <div className="flex flex-col items-center shadow-md rounded p-6 m-6">
        {/* {data && <BookComponent data={data} />} */}
      </div>
    );
};

const getData = async (book: string, bookContext: string) => {
    const record: LinesRecord | null = await xata.db.lines.filter({ book, bookContext }).getFirst();
    return record;
}

export default ChapterPage;
