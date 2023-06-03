import SearchBar from '@/components/SearchBar';
export default function Home() {
  return (
    <main className='flex flex-col h-screen items-center'>
      <div className='z-10 w-full h-full max-w-5xl items-center  justify-between font-mono text-sm'>
        <SearchBar />
      </div>
    </main>
  );
}
