import { useState } from 'react';
import { useTracksStore } from '../../store/TracksStore';

export default function Sort() {
  const fetchTracks = useTracksStore((state) => state.fetchTracks);

  const searchParams = new URLSearchParams(window.location.search);
  const initialOrder = searchParams.get('order') || 'asc';
  const initialField = searchParams.get('sort') || '';

  const [order, setOrder] = useState(initialOrder);
  const [field, setField] = useState(initialField);

  const setPage = useTracksStore((state) => state.setPage);

  const updateURL = (key: string, value: string) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    updateURL('order', newOrder);
    setPage(1);
    fetchTracks();
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = e.target.value;
    setField(newField);
    updateURL('sort', newField);
    setPage(1);
    fetchTracks();
  };

  return (
    <div className="flex items-center">
      <p className="text-base max-md:text-sm">Sort by:</p>
      <div className="ml-4 flex max-md:ml-2">
        <select
          value={order}
          className="glass-select block w-[100px] rounded-s-2xl border-r-1 border-black border-s-gray-100 bg-gray-50 p-2.5 text-black placeholder-gray-400 outline-none focus:border-1 focus:border-white max-md:w-[70px] max-md:px-2 max-md:py-1 max-md:text-sm"
          onChange={handleSortOrderChange}
        >
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        <select
          className="glass-select block w-full rounded-e-2xl border-gray-300 border-s-gray-100 bg-gray-50 p-2.5 text-black placeholder-gray-400 outline-none focus:border-1 focus:border-white max-md:px-2 max-md:py-1 max-md:text-sm"
          onChange={handleSortByChange}
          value={field}
          data-testid="sort-select"
        >
          <option value="">Default</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="title">Title</option>
          <option value="createdAt">Created At</option>
        </select>
      </div>
    </div>
  );
}
