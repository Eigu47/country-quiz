export const TIME_LIMIT =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development" ? 1000 : 20;

export const GAME_MODES = [
  {
    name: "flag",
    title: "Guess by flag",
    description: "Guess the country by the flag",
    options: 4,
  },
  {
    name: "bigger",
    title: "Which is bigger",
    description: "Which country has bigger area?",
    options: 2,
  },
  {
    name: "neighbours",
    title: "Neighbours",
    description: "Which country has the next bordering countries",
    options: 4,
  },
  {
    name: "region",
    title: "Not from here",
    description: "Guess the country that is not from the region",
    options: 4,
  },
  {
    name: "closer",
    title: "Who's closer",
    description: "Which country is closer to the next country?",
    options: 3,
  },
  {
    name: "my-flag",
    title: "Guess my flag",
    description: "Guess the flag by the country name",
    options: 9,
  },
];
