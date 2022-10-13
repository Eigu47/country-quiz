import type { NextPage } from "next";
import Link from "next/link";

import { GAME_MODES } from "@/constants/game-const";

const Home: NextPage = () => {
  return (
    <main className="container mx-auto flex flex-col text-center sm:py-10">
      <h1 className="mt-20 mb-14 text-4xl text-slate-100 sm:text-5xl">
        Country Quiz
      </h1>
      <section className="grid gap-3 px-3 sm:mx-auto sm:grid-cols-3">
        {GAME_MODES.map((mode) => (
          <Link href={`/${mode.name}`} key={mode.name}>
            <button className="rounded-xl bg-cyan-500 p-3 text-xl sm:p-10 sm:text-3xl">
              <h3>{mode.title}</h3>
            </button>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Home;
