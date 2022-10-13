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
];
