import { FLAT_COUNTRIES } from "../constants/countries";

export function getRandomCountry() {
  return FLAT_COUNTRIES[
    Math.floor(Math.random() * FLAT_COUNTRIES.length)
  ] as string;
}
