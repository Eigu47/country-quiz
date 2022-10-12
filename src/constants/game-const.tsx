export const TIME_LIMIT = 999;

export const GAME_MODES = [
  {
    name: "flag",
    title: "Guess by flag",
    description: "Guess the country by the flag",
    options: "name",
    optionsLength: 4,
  },
  {
    name: "bigger",
    title: "Which is bigger",
    description: "Guess which country is bigger",
    options: "flag",
    optionsLength: 2,
  },
];
