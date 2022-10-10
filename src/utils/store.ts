import create from "zustand";
import { persist } from "zustand/middleware";

import { TIME_LIMIT } from "../constants/game-const";

type TimerState = {
  timeLeft: number;
  isTimerRunning: boolean;
  isTimeLeft: boolean;
  playTimer: (play: boolean) => void;
  setTimer: (timeLimit: number) => void;
  startTimer: (start: boolean, timeLimit?: number) => void;
  addTime: (time: number) => void;
};

let interval: NodeJS.Timeout | null = null;

export const useTimerStore = create<TimerState>((set, get) => ({
  timeLeft: TIME_LIMIT,

  isTimerRunning: false,

  isTimeLeft: true,

  playTimer: (play) => {
    function clear() {
      if (get().timeLeft === 0) set({ isTimeLeft: false });
      if (interval === null) return;
      clearInterval(interval);
      set({ isTimerRunning: false });
      interval = null;
    }

    if (!play || get().timeLeft === 0) return clear();
    if (interval !== null) return;

    set({ isTimerRunning: true });

    set((state) => ({ timeLeft: state.timeLeft - 1 }));
    const newInterval = setInterval(() => {
      if (get().timeLeft === 0) return clear();

      set((state) => ({ timeLeft: state.timeLeft - 1 }));

      if (get().timeLeft === 0) set({ isTimeLeft: false });
    }, 1000);

    interval = newInterval;
  },

  setTimer: (timeLimit) => {
    if (timeLimit < 0) return;
    if (timeLimit > 0) set({ isTimeLeft: true });
    set({ timeLeft: timeLimit });
  },

  startTimer: (start, timeLimit) => {
    if (timeLimit !== undefined) get().setTimer(timeLimit);
    get().playTimer(start);
  },

  addTime: (time) => {
    if (get().timeLeft === 0) return;
    set((state) => ({ timeLeft: state.timeLeft + time }));
  },
}));

type RoundState = {
  round: number | null;
  nextRound: () => void;
  resetRound: () => void;
};

export const useRoundStore = create<RoundState>((set) => ({
  round: null,

  nextRound: () => {
    set((state) => ({ round: state.round === null ? 0 : state.round + 1 }));
  },

  resetRound: () => {
    set({ round: null });
  },
}));

type MaxScoreState = {
  maxScore: { mode: string; score: number }[];
  setMaxScore: (mode: string, score: number) => void;
};

export const useMaxScoreStore = create<MaxScoreState>()(
  persist(
    (set, get) => ({
      maxScore: [],

      setMaxScore: (mode, score) => {
        const prevScore = get().maxScore.find(
          (score) => score.mode === mode
        )?.score;

        if (score > (prevScore ?? 0)) {
          set((state) => ({
            maxScore: [
              ...state.maxScore.filter((score) => score.mode !== mode),
              { mode, score },
            ],
          }));
        }
      },
    }),
    {
      name: "country-quiz-records",
    }
  )
);
