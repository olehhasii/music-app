import { create } from 'zustand';

type BulkDeleteStore = {
  isBulkDeleteOn: boolean;
  selectedTracks: string[];

  toggleBulkDelete: () => void;
  selectAllTracks: (ids: string[]) => void;
  selectTrack: (id: string) => void;
  removeTrack: (id: string) => void;
  clearSelectedTracks: () => void;
};

export const useBulkDeleteStore = create<BulkDeleteStore>((set, get) => ({
  isBulkDeleteOn: false,
  selectedTracks: [],

  toggleBulkDelete: () => {
    const { isBulkDeleteOn } = get();
    set({ isBulkDeleteOn: !isBulkDeleteOn });
  },
  selectAllTracks: (ids: string[]) => {
    set({ selectedTracks: ids });
  },
  selectTrack: (id: string) => {
    const { selectedTracks } = get();
    if (!selectedTracks.includes(id)) {
      set({ selectedTracks: [...selectedTracks, id] });
    }
  },
  removeTrack: (id: string) => {
    const { selectedTracks } = get();
    set({ selectedTracks: selectedTracks.filter((trackId) => trackId !== id) });
  },
  clearSelectedTracks: () => {
    set({ selectedTracks: [] });
  },
}));
