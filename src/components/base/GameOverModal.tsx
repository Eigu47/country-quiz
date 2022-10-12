import React from "react";

import Modal from "@/components/base/Modal";
import useGetGameMode from "@/utils/hooks/useGetGameMode";
import { useMaxScoreStore, useRoundStore } from "@/utils/store";

type Props = {
  playAgain: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GameOverModal({ playAgain, setModalOpen }: Props) {
  const gameMode = useGetGameMode();

  const round = useRoundStore((state) => state.round);
  const { maxScore, setMaxScore } = useMaxScoreStore();

  const prevRecord =
    maxScore.find((score) => score.mode === gameMode?.name)?.score ?? null;

  function RecordText() {
    if (round && round > (prevRecord ?? 0)) {
      return <p>New Record! {round ?? 0}</p>;
    }
    if (prevRecord === null) {
      return <p>Your score: {round ?? 0}</p>;
    }
    return (
      <>
        <p>Your score: {round ?? 0}</p>
        <p className="text-2xl">Your record: {prevRecord}</p>
      </>
    );
  }

  return (
    <Modal>
      <div className="flex h-full w-full flex-col justify-between py-10 text-center text-3xl">
        <RecordText />
        <div className="mx-auto flex w-5/6 justify-center gap-10">
          <button
            className="w-1/2 whitespace-nowrap rounded-xl bg-slate-400 px-1 py-4 text-2xl shadow ring-1 ring-black/20 duration-100 hover:scale-105 active:scale-95 sm:px-2 sm:py-5"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Back
          </button>
          <button
            className="w-1/2 whitespace-nowrap rounded-xl bg-cyan-500 px-1 py-4 text-2xl shadow ring-1 ring-black/20 duration-100 hover:scale-105 active:scale-95 sm:px-2 sm:py-5"
            onClick={() => {
              playAgain();
              gameMode && round && setMaxScore(gameMode.name, round);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </Modal>
  );
}
