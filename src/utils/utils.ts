import { FLAT_COUNTRIES } from "../constants/countries-const";

export function getRandomCountry() {
  return FLAT_COUNTRIES[
    Math.floor(Math.random() * FLAT_COUNTRIES.length)
  ] as string;
}

export function getRandomCountryIndexes() {
  const indexes = Array(FLAT_COUNTRIES.length)
    .fill(0)
    .map((_, i) => i);

  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    //@ts-ignore
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  return indexes;
}
