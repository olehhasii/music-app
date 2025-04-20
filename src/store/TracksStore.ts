import { create } from 'zustand';
import { PaginationMeta, Track } from '../types';
import { getAllTracks } from '../api/tracks';

type TrackStore = {
  tracks: Track[];
  paginationMetaData?: PaginationMeta;
  isLoading: boolean;
  fetchTracks: () => Promise<void>;
  setTracks: (tracks: Track[]) => void;
};

export const useTracksStore = create<TrackStore>((set) => ({
  tracks: [],
  paginationMetaData: undefined,
  isLoading: true,

  setTracks: (tracks) => set({ tracks }),

  fetchTracks: async () => {
    set({ isLoading: true });
    try {
      const { data, meta } = await getAllTracks();
      set({ tracks: data, paginationMetaData: meta });
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
