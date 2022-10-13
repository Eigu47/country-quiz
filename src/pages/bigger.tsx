import type { NextPage } from "next";

import GameOverModal from "@/components/base/GameOverModal";
import QuizCard from "@/components/base/QuizCard";
import BiggerOption from "@/components/bigger/BiggerChoices";
import useQuiz from "@/utils/hooks/useQuiz";

const Bigger: NextPage = () => {
  const {
    randomIndexes,
    autoAnimateRef,
    round,
    modalOpen,
    setModalOpen,
    nextCountry,
    playAgain,
    currentCountry,
  } = useQuiz();

  return (
    <main
      ref={autoAnimateRef}
      className="container mx-auto flex h-full flex-col text-center"
    >
      <QuizCard
        nextCountry={nextCountry}
        className={round === null ? "h-32 sm:h-52" : "h-[60vh] sm:h-[35vh]"}
      >
        {currentCountry && (
          <BiggerOption
            key={round}
            nextCountry={nextCountry}
            randomIndexes={randomIndexes}
          />
        )}
      </QuizCard>
      {modalOpen && (
        <GameOverModal playAgain={playAgain} setModalOpen={setModalOpen} />
      )}
    </main>
  );
};

export default Bigger;
