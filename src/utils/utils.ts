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

    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  return indexes;
}

export function getOptions(randomCountryIndexes: number[], round: number) {
  const correctCountry = COUNTRIES_LIST[randomCountryIndexes[round]];
  const options = [correctCountry.name];

  while (options.length < 4) {
    const randomIndex = Math.floor(Math.random() * COUNTRIES_LENGTH);
    const randomCountry = COUNTRIES_LIST[randomIndex].name;

    if (options.includes(randomCountry)) continue;

    options.push(randomCountry);
  }

  return shuffleArray(options);
}
