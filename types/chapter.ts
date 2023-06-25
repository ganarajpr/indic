export type ChapterResponse = {
    book: string;
    bookContext: string;
    text: string;
  };
  
export type ChapterPageProps = {
    params: ChapterPageParams;
  };
  
export type ChapterPageParams = {
    book: string;
    chapterNo: string;
};
