import COUNTRIES_LIST from "@/constants/countries.json";
import type { Country } from "@/types/country-types";

const COUNTRIES_LENGTH = COUNTRIES_LIST.length;

export function getRandomCountryIndexes(length?: number) {
  const indexes = Array(length ?? COUNTRIES_LENGTH)
    .fill(0)
    .map((_, i) => i);

  return shuffleArray(indexes);
}

export function shuffleArray<T>(indexes: T[]): T[] {
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Ts-safe way to say: [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    const [ii, jj] = [indexes[j], indexes[i]];
    if (ii !== undefined && jj !== undefined) {
      [indexes[i], indexes[j]] = [ii, jj];
    }
  }
  return indexes;
}

export function getRandomCountry(
  filterType?: string,
  filterName?: string
): Country {
  const randomIndex = Math.floor(Math.random() * COUNTRIES_LENGTH);
  const randomCountry = COUNTRIES_LIST[randomIndex] as Country;

  if (filterType === "region" && randomCountry.subregion === filterName) {
    return getRandomCountry(filterType, filterName);
  }

  return randomCountry;
}

let previousCountries: Country[] = [];

export function getOptions(
  countryIndex: number | undefined,
  optionsLength: number | undefined,
  uniqueBy?: "borders" | "region"
): Country[] {
  // Early returns to make ts happy
  if (countryIndex === undefined || optionsLength === undefined) return [];
  const correctCountry = COUNTRIES_LIST[countryIndex];
  if (correctCountry === undefined) return [];

  const options = [correctCountry];
  // Persist countries to the next round
  const prevCountry = COUNTRIES_LIST[countryIndex - 1];
  const nextCountry = COUNTRIES_LIST[countryIndex + 1];
  prevCountry && previousCountries.push(prevCountry);
  nextCountry && previousCountries.push(nextCountry);

  while (options.length < optionsLength) {
    const randomIndex = Math.floor(Math.random() * COUNTRIES_LENGTH);
    const randomCountry = COUNTRIES_LIST[randomIndex];
    // Keep looping if the country is already an option or previous options
    if (
      randomCountry === undefined ||
      options.includes(randomCountry) ||
      previousCountries.includes(randomCountry)
    )
      continue;
    // If uniqueBy is specified, keep looping by unique value
    if (uniqueBy === "borders") {
      if (checkIsEqual(randomCountry.borders, correctCountry.borders)) continue;
    }
    if (uniqueBy === "region") {
      if (randomCountry.subregion !== correctCountry.subregion) continue;
    }

    options.push(randomCountry);
  }

  previousCountries = options;
  return shuffleArray(options);
}

function checkIsEqual(array1: string[], array2: string[]) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}
