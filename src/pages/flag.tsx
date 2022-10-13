import type { NextPage } from "next";
import Image from "next/image";

import GameOverModal from "@/components/base/GameOverModal";
import QuizCard from "@/components/base/QuizCard";
import QuizChoices from "@/components/base/QuizChoices";
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
      <QuizCard nextCountry={nextCountry}>
        {currentCountry && (
          <Image
            key={round}
            src={currentCountry.flag}
            alt="Flag"
            objectFit="contain"
            layout="fill"
            priority
          />
        )}
      </QuizCard>
      <QuizChoices
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
