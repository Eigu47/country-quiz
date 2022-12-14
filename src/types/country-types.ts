// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface Country {
  name: string;
  code: string;
  latlng: number[];
  capital: Capital;
  altSpellings: string[];
  region: Region | string;
  subregion: Subregion | string;
  languages: string[];
  borders: string[];
  area: number;
  population: number;
  map: string;
  flag: string;
}

export interface Capital {
  name?: string;
  latlng?: number[];
}

export type Region =
  | "Africa"
  | "Americas"
  | "Antarctic"
  | "Asia"
  | "Europe"
  | "Oceania";

export type Subregion =
  | "Antarctic"
  | "Australia and New Zealand"
  | "Caribbean"
  | "Central America"
  | "Central Asia"
  | "Central Europe"
  | "Eastern Africa"
  | "Eastern Asia"
  | "Eastern Europe"
  | "Melanesia"
  | "Micronesia"
  | "Middle Africa"
  | "North America"
  | "Northern Africa"
  | "Northern Europe"
  | "Polynesia"
  | "South America"
  | "South-Eastern Asia"
  | "Southeast Europe"
  | "Southern Africa"
  | "Southern Asia"
  | "Southern Europe"
  | "Western Africa"
  | "Western Asia"
  | "Western Europe";
