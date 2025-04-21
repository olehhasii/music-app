import { create } from 'zustand';
import { PaginationMeta, Track } from '../types';
import { getAllTracks } from '../api/tracks';

type TrackStore = {
  tracks: Track[];
  paginationMetaData?: PaginationMeta;
  isLoading: boolean;
  fetchTracks: () => Promise<void>;
  setTracks: (tracks: Track[]) => void;
  page: number;
  setPage: (num: number) => void;
};

export const useTracksStore = create<TrackStore>((set, get) => ({
  tracks: [],
  paginationMetaData: undefined,
  isLoading: true,
  page: 1,
  setTracks: (tracks) => set({ tracks }),
  setPage: (number) => set({ page: number }),
  fetchTracks: async () => {
    set({ isLoading: true });

    const { page } = get(); // ✅ get page from store

    const searchParams = new URLSearchParams(window.location.search);
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || 'asc';
    const artist = searchParams.get('artist') || '';
    const genre = searchParams.get('genre') || '';

    try {
      const { data, meta } = await getAllTracks(page, sort, order, artist, genre);
      set({ tracks: data, paginationMetaData: meta });
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
