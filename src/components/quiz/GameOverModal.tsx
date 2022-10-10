import React from "react";

import useGetGameMode from "../../utils/hooks/useGetGameMode";
import { useMaxScoreStore, useRoundStore } from "../../utils/store";
import Modal from "../utils/Modal";

type Props = {
  playAgain: () => void;
};

export default function GameOverModal({ playAgain }: Props) {
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
        <button
          className="my-6 mx-auto w-min whitespace-nowrap rounded-xl bg-cyan-500 px-1 py-4 text-2xl shadow ring-1 ring-black/20 duration-100 hover:scale-105 active:scale-95 sm:px-3 sm:py-6 sm:text-3xl"
          onClick={() => {
            playAgain();
            gameMode && round && setMaxScore(gameMode.name, round);
          }}
        >
          Try Again?
        </button>
      </div>
    </Modal>
  );
}
