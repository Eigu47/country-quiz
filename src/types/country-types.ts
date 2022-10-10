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
  subregion: string;
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

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}