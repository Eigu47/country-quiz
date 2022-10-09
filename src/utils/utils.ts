import { FLAT_COUNTRIES } from "../constants/countries-const";
import COUNTRIES_LIST from "../constants/countries.json";

const COUNTRIES_LENGTH = FLAT_COUNTRIES.length;

export function getRandomCountryIndexes() {
  const indexes = Array(COUNTRIES_LENGTH)
    .fill(0)
    .map((_, i) => i);

  return shuffleArray(indexes);
}

export function shuffleArray<T>(indexes: T[]): T[] {
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // @ts-ignore hard to make ts happy here
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  return indexes;
}

let previousCountries: string[] = [];

export function getOptions(randomIndexes: number[], round: number | null) {
  if (round === null) return [];

  const correctCountry = COUNTRIES_LIST[randomIndexes[round]!]?.name ?? "";
  const options = [correctCountry];
  // Prevent the same country from appearing twice in a row
  const prevCountry = COUNTRIES_LIST[randomIndexes[round - 1]!]?.name ?? "";
  const nextCountry = COUNTRIES_LIST[randomIndexes[round + 1]!]?.name ?? "";
  previousCountries = [...previousCountries, prevCountry, nextCountry];

  while (options.length < 4) {
    const randomIndex = Math.floor(Math.random() * COUNTRIES_LENGTH);
    const randomCountry = COUNTRIES_LIST[randomIndex]!.name;

    if (
      options.includes(randomCountry) ||
      previousCountries.includes(randomCountry)
    )
      continue;

    options.push(randomCountry);
  }
  // Persist previous countries to the next round
  previousCountries = options;
  return shuffleArray(options);
}
