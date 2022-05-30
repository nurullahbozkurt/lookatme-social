import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@100;300;400;500;600;700&family=Nunito:wght@300;400;500;600;700&family=Poiret+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-100 font-nunito">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
