import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Head from 'next/head';

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
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "kjnv3uen6k");
        `,
          }}
        />
      </Head>
    </>
  );
}
