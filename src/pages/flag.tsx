import { useState } from "react";

import type { NextPage } from "next";
import Image from "next/image";
import { useQuery } from "react-query";

import { CountryType } from "../types/countryTypes";
import getRandomCountry from "../utils/getRandomCountry";

const Flag: NextPage = () => {
  const [randomCountry] = useState(() => getRandomCountry());

  const { data, isLoading } = useQuery<[CountryType]>(
    ["flag", randomCountry],
    () =>
      fetch(`https://restcountries.com/v3.1/name/${randomCountry}`).then(
        (res) => res.json()
      ),
    {
      onSuccess: console.log,
    }
  );

  return (
    <main className="container mx-auto text-center">
      <section className="relative my-40 mx-auto w-4/6 rounded-xl bg-white/90">
        {!isLoading && data && (
          <Image
            src={data[0].flags.svg}
            alt={data[0].name.common}
            width={320}
            height={200}
          />
        )}
      </section>
    </main>
  );
};

export default Flag;
