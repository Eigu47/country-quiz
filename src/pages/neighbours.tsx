import type { NextPage } from "next";

import GameOverModal from "@/components/base/GameOverModal";
import QuizCard from "@/components/base/QuizCard";
import QuizChoices from "@/components/base/QuizChoices";
import type { Country } from "@/types/country-types";
import useQuiz from "@/utils/hooks/useQuiz";

const Neighbours: NextPage = () => {
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
          <BordersList key={round} currentCountry={currentCountry} />
        )}
      </QuizCard>
      <QuizChoices
        key={round}
        nextCountry={nextCountry}
        randomIndexes={randomIndexes}
        uniqueBy="borders"
      />
      {modalOpen && (
        <GameOverModal playAgain={playAgain} setModalOpen={setModalOpen} />
      )}
    </main>
  );
};

export default Neighbours;

function BordersList({ currentCountry }: { currentCountry: Country }) {
  if (currentCountry.borders.length) {
    return (
      <>
        <h3 className="text-lg sm:text-xl">Bordering countries:</h3>
        <div className="grid h-full w-full grid-cols-3 place-items-center gap-3 px-4">
          {currentCountry?.borders.map((border) => (
            <p key={border}>{border}</p>
          ))}
        </div>
      </>
    );
  }

  return <h3 className="text-xl sm:text-2xl">No bordering countries</h3>;
}
