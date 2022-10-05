import type { NextPage } from "next";
import rawAfrica from "../constants/raw-africa.json";
import allCountries from "../constants/raw-all-countries.json";
import type { RawCountry } from "../types/raw-country";

const Script: NextPage = () => {
  const subregionFlat = Array.from(
    new Set(allCountries.flatMap((country) => country.subregion))
  ).sort();

  const regionFlat = Array.from(
    new Set(allCountries.flatMap((country) => country.region))
  ).sort();

  return (
    <div className="container mx-auto h-full">
      <textarea className="my-10 h-2/6 w-full">
        {JSON.stringify(formatCountry(allCountries))}
      </textarea>
    </div>
  );
};

export default Script;

function formatCountry(raw: RawCountry[]) {
  return raw.map((country) => {
    return {
      name: country.name.common,
      code: country.cca3,
      capital: {
        name: country.capital ? country.capital[0] : undefined,
        latlng: country.latlng,
      },
      altSpellings: [
        country.name.official,
        ...country.altSpellings.filter((alt) => alt.length > 3),
      ],
      region: country.region,
      subregion: country.subregion,
      languages: country.languages ? Object.values(country.languages) : [],
      borders: country.borders?.map(
        (border) => allCountries.find((c) => c.cca3 === border)?.name.common
      ),
      area: country.area,
      population: country.population,
      map: country.maps.googleMaps,
      flag: country.flags.png,
    };
  });
}
