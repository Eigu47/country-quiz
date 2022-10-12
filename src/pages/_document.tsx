import { Head, Html, Main, NextScript } from "next/document";
import { BsGithub } from "react-icons/bs";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id="portal" />
        <div className="fixed right-0 top-0 flex h-24 w-24 translate-x-1/2 -translate-y-1/2 rotate-45 justify-center overflow-hidden bg-black/40 sm:h-36 sm:w-36">
          <a
            href="https://github.com/Eigu47/country-quiz"
            rel="noreferrer"
            target="_blank"
            className="absolute bottom-1 -rotate-45 text-3xl text-slate-100/10 duration-200 hover:text-slate-100/80 sm:text-5xl sm:text-transparent"
          >
            <BsGithub />
          </a>
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
