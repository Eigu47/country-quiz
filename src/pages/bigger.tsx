import type { NextPage } from "next";

import QuizCard from "@/components/quiz-card/QuizCard";
import QuizCardChoices from "@/components/quiz-card/QuizCardChoices";
import GameOverModal from "@/components/utils/GameOverModal";
import StartButton from "@/components/utils/StartButton";
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
          <QuizCardChoices
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
