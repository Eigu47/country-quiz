import React from "react";

type Props = {
  nextCountry: () => void;
};

export default function StartButton({ nextCountry }: Props) {
  return (
    <button
      className="mx-auto my-3 h-fit rounded-xl bg-cyan-500 px-12 py-6 text-xl shadow ring-1 ring-black/30 transition-transform duration-100 hover:scale-105 active:scale-95"
      onClick={nextCountry}
    >
      Start!
    </button>
  );
}
