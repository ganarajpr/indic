import { Inter } from 'next/font/google';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smrthi',
  description: 'Indic scriptures',
};


export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Header />
        {children}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-YMJXKTXSRF'
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-YMJXKTXSRF', {
                    page_path: window.location.pathname,
                    });
                `,
          }}
        />
    </>
  );
}
