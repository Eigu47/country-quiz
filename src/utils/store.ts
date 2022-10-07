import create from "zustand";

type PlayingState = {
  isPlaying: boolean;
  setIsPlaying: (boolean: boolean) => void;
};

export const usePlayingStore = create<PlayingState>((set) => ({
  isPlaying: false,
  setIsPlaying: (boolean: boolean) => set({ isPlaying: boolean }),
}));

type TimerState = {
  timer: number;
  setTimer: (number: number) => void;
  interval: NodeJS.Timeout | null;
  startTimer: (boolean: boolean) => void;
  timerIsRunning: boolean;
  isTimeOver: boolean;
};

export const useTimerStore = create<TimerState>((set, get) => ({
  timer: 10,

  setTimer: (number: number) => {
    if (number <= 0) return;
    set({ timer: number });
    set({ isTimeOver: false });
  },

  interval: null,

  startTimer: (boolean) => {
    function clear() {
      if (!get().timerIsRunning) return;
      clearInterval(get().interval!);
      set({ interval: null });
      set({ timerIsRunning: false });
    }

    if (!boolean) return clear();
    if (get().timerIsRunning || get().timer === 0) return;

    set({ timerIsRunning: true });

    const newInterval = setInterval(() => {
      if (get().timer === 0) {
        clear();
        set({ isTimeOver: true });

        return;
      }
      set((state) => ({ timer: state.timer - 1 }));
    }, 1000);

    set({ interval: newInterval });
  },

  timerIsRunning: false,

  isTimeOver: false,
}));
