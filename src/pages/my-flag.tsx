import type { NextPage } from "next";

import GameOverModal from "@/components/base/GameOverModal";
import QuizCard from "@/components/base/QuizCard";
import FlagChoices from "@/components/my-flag/FlagChoices";
import useQuiz from "@/utils/hooks/useQuiz";

const MyFlag: NextPage = () => {
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
          <h3 key={round} className="text-2xl sm:text-3xl">
            {currentCountry.name}
          </h3>
        )}
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

export default MyFlag;
