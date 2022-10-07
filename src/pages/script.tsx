import { useState } from "react";

import type { NextPage } from "next";

import { FLAT_REGIONS } from "../constants/countries-const";
import formatedCountries from "../constants/countries.json";
import rawCountries from "../constants/raw-countries.json";
import { trpc } from "../utils/trpc";

const Script: NextPage = () => {
  const [region, setRegion] = useState<string>();

  const { mutate } = trpc.useMutation("script.post");
  const { data } = trpc.useQuery(["script.get", region], {
    enabled: !!region,
  });

  return (
    <div className="container mx-auto h-full">
      <textarea
        className="my-10 h-2/6 w-full"
        value={JSON.stringify(formatCountry(rawCountries))}
        readOnly
      />
      <button
        className="w-full rounded-xl bg-cyan-400 p-2"
        onClick={() => mutate(formatedCountries)}
      >
        Post
      </button>
      <textarea
        className="my-10 h-2/6 w-full"
        value={JSON.stringify(data)}
        readOnly
      />
      <div className="flex gap-2">
        {FLAT_REGIONS.map((region) => (
          <button
            key={region}
            className="w-full rounded-xl bg-cyan-400 p-2"
            onClick={() => setRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Script;

function formatCountry(raw: typeof rawCountries) {
  return raw.map((country) => {
    return {
      name: country.name.common,
      code: country.cca3,
      latlng: country.latlng,
      capital: country.capital?.length
        ? country.capital[0]
        : country.name.common,
      altSpellings: [
        country.name.official,
        ...country.altSpellings.filter((alt) => alt.length > 3),
      ],
      regionId: country.region,
      subregionId: country.subregion ?? "Antarctic",
      languages: country.languages ? Object.values(country.languages) : [],
      borders: country.borders
        ? country.borders?.map(
            (border) => rawCountries.find((c) => c.cca3 === border)?.name.common
          )
        : [],
      area: country.area,
      population: country.population,
      map: country.maps.googleMaps,
      flag: country.flags.svg,
    };
  });
}
