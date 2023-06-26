import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smrthi',
  description: 'Indic scriptures',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`min-h-screen ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
