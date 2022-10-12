import type { NextPage } from "next";

import GameOverModal from "@/components/base/GameOverModal";
import QuizCard from "@/components/base/QuizCard";
import StartButton from "@/components/base/StartButton";
import BiggerOption from "@/components/bigger/BiggerChoices";
import useQuiz from "@/utils/hooks/useQuiz";

const Bigger: NextPage = () => {
  const {
    randomIndexes,
    autoAnimateRef,
    round,
    isTimerRunning,
    isTimeLeft,
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
        className={round === null ? "h-32 sm:h-[30vh]" : "h-[55vh] sm:h-[30vh]"}
      >
        {currentCountry && (
          <BiggerOption
            key={round}
            nextCountry={nextCountry}
            randomIndexes={randomIndexes}
          />
        )}
        {round === null && <StartButton nextCountry={nextCountry} />}
      </QuizCard>
      {!isTimerRunning && !isTimeLeft && (
        <GameOverModal playAgain={playAgain} />
      )}
    </main>
  );
};

export default Bigger;
