import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body className="bg-stone-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
