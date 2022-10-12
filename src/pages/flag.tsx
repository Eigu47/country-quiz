import type { NextPage } from "next";
import Image from "next/image";

import GameOverModal from "@/components/base/GameOverModal";
import QuizCard from "@/components/base/QuizCard";
import StartButton from "@/components/base/StartButton";
import FlagChoices from "@/components/flag/FlagChoices";
import useQuiz from "@/utils/hooks/useQuiz";

const Flag: NextPage = () => {
  const {
    randomIndexes,
    autoAnimateRef,
    round,
    nextCountry,
    playAgain,
    currentCountry,
    modalOpen,
    setModalOpen,
  } = useQuiz();

  return (
    <main
      ref={autoAnimateRef}
      className="container mx-auto flex h-full flex-col text-center"
    >
      <QuizCard>
        {currentCountry && (
          <Image
            src={currentCountry.flag}
            alt="Flag"
            objectFit="contain"
            layout="fill"
            priority
          />
        )}
        {round === null && <StartButton nextCountry={nextCountry} />}
      </QuizCard>
      <FlagChoices
        key={round}
        nextCountry={nextCountry}
        randomIndexes={randomIndexes}
      />
      {modalOpen && (
        <GameOverModal playAgain={playAgain} setModalOpen={setModalOpen} />
      )}
    </main>
  );
};

export default Flag;
