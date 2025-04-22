import { create } from 'zustand';

type AudioPlayerStore = {
  currentId: string | null;
  setCurrentId: (id: string | null) => void;
};

export const useAudioPlayerStore = create<AudioPlayerStore>((set) => ({
  currentId: null,
  setCurrentId: (id) => set({ currentId: id }),
}));
