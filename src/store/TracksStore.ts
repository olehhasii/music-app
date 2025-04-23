import { create } from 'zustand';
import { PaginationMeta, Track } from '../types';
import { getAllTracks, searchTrack } from '../api/tracks';

type TrackStore = {
  tracks: Track[];
  paginationMetaData?: PaginationMeta;
  isLoading: boolean;
  fetchTracks: () => Promise<void>;
  setTracks: (tracks: Track[]) => void;
  page: number;
  setPage: (num: number) => void;
  searchTracks: (searchString: string) => Promise<void>;
  error: boolean;
  setError: (isError: boolean) => void;
};

export const useTracksStore = create<TrackStore>((set, get) => ({
  tracks: [],
  paginationMetaData: undefined,
  isLoading: true,
  page: 1,
  error: false,
  setTracks: (tracks) => set({ tracks }),
  setPage: (number) => set({ page: number }),
  fetchTracks: async () => {
    set({ isLoading: true, error: false });

    const { page } = get();

    const searchParams = new URLSearchParams(window.location.search);
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || 'asc';
    const artist = searchParams.get('artist') || '';
    const genre = searchParams.get('genre') || '';

    try {
      const { data, meta } = await getAllTracks(page, sort, order, artist, genre);
      set({ tracks: data, paginationMetaData: meta });
    } catch (e) {
      set({ error: true });
    } finally {
      set({ isLoading: false });
    }
  },
  searchTracks: async (searchString: string) => {
    set({ isLoading: true });

    try {
      const { data, meta } = await searchTrack(searchString);
      set({ tracks: data, paginationMetaData: meta });
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
  setError: (isError) => set({ error: isError }),
}));
