import type { NextPage } from "next";

import GameOverModal from "@/components/base/GameOverModal";
import QuizCard from "@/components/base/QuizCard";
import CloserChoices from "@/components/closer/CloserChoices";
import useQuiz from "@/utils/hooks/useQuiz";

const Closer: NextPage = () => {
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
          <CloserChoices
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

export default Closer;
