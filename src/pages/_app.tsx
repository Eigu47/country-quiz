import type { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Country Quiz</title>
        <meta
          name="description"
          content="Can you name the county by its flag? How many capitals do you know? Play multiple geography mini games and learn about countries!"
        />
        <meta property="og:title" content="Country Quiz" />
        <meta
          property="og:description"
          content="Can you name the county by its flag? How many capitals do you know? Play multiple geography mini games and learn about countries!"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://country-quiz-eigu.vercel.app/"
        />
        <meta property="og:locale" content="en_US" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
