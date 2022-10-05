import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="container mx-auto flex flex-col text-center">
      <h1 className="my-20 text-5xl text-slate-100">Start quiz</h1>
      <section className="mx-auto flex w-5/6">
        <Link href="/flag">
          <button className="rounded-xl bg-cyan-500 p-10 text-3xl">
            <h3>Guess by flag</h3>
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Home;
