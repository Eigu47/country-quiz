import countriesList from "../constants/countries-list.json";

export default function getRandomCountry() {
  const countries = countriesList.flatMap((list) => list.countries);

  return countries[Math.floor(Math.random() * countries.length)] as string;
}
