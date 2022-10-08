import create from "zustand";

type TimerState = {
  timeLeft: number;
  isTimerRunning: boolean;
  isTimeOver: boolean;
  playTimer: (play: boolean) => void;
  setTimer: (timeLimit: number) => void;
  startTimer: (start: boolean, timeLimit?: number) => void;
  addTime: (time: number) => void;
};

let interval: NodeJS.Timeout | null = null;

export const useTimerStore = create<TimerState>((set, get) => ({
  timeLeft: 0,

  isTimerRunning: false,

  isTimeOver: false,

  playTimer: (play) => {
    function clear() {
      if (get().timeLeft === 0) set({ isTimeOver: true });
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

      if (get().timeLeft === 0) set({ isTimeOver: true });
    }, 1000);

    interval = newInterval;
  },

  setTimer: (timeLimit) => {
    if (timeLimit < 0) return;
    if (timeLimit > 0) set({ isTimeOver: false });
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
  round: number;
  nextRound: () => void;
  resetRound: () => void;
};

export const useRoundStore = create<RoundState>((set) => ({
  round: 0,

  nextRound: () => {
    set((state) => ({ round: state.round + 1 }));
  },

  resetRound: () => {
    set({ round: 0 });
  },
}));
