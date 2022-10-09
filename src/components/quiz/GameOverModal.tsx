import React from "react";

import { useMaxScoreStore, useRoundStore } from "../../utils/store";
import Modal from "../utils/Modal";

type Props = {
  playAgain: () => void;
  gameMode: string;
};

export default function GameOverModal({ playAgain, gameMode }: Props) {
  const round = useRoundStore((state) => state.round);
  const { maxScore, setMaxScore } = useMaxScoreStore();

  const prevRecord =
    maxScore.find((score) => score.mode === gameMode)?.score ?? null;

  return (
    <Modal>
      <div className="flex h-full w-full flex-col justify-between py-10 text-center text-3xl">
        <RecordText prevRecord={prevRecord} round={round} />
        <button
          className="my-6 mx-auto w-min whitespace-nowrap rounded-xl bg-cyan-500 px-1 py-4 text-2xl shadow ring-1 ring-black/20 duration-100 hover:scale-105 active:scale-95 sm:px-3 sm:py-6 sm:text-3xl"
          onClick={() => {
            playAgain();
            setMaxScore(gameMode, round ?? 0);
          }}
        >
          Try Again?
        </button>
      </div>
    </Modal>
  );
}

type RecordTextProps = {
  round: number | null;
  prevRecord: number | null;
};

function RecordText({ round, prevRecord }: RecordTextProps) {
  if (prevRecord === null) {
    return <p>Your score: {round ?? 0}</p>;
  }

  if ((round ?? 0) > prevRecord) {
    return <p>New Record! {round ?? 0}</p>;
  }

  return (
    <>
      <p>Your score: {round ?? 0}</p>
      <p className="text-2xl">Your record: {prevRecord}</p>
    </>
  );
}
