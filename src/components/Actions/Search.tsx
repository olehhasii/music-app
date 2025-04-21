import { useEffect, useState } from 'react';
import { useTracksStore } from '../../store/TracksStore';

export default function Search() {
  const searchTracks = useTracksStore((state) => state.searchTracks);
  const fetchTracks = useTracksStore((state) => state.fetchTracks);
  const setPage = useTracksStore((state) => state.setPage);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      if (inputValue) {
        searchTracks(inputValue);
      } else {
        fetchTracks();
      }
      setPage(1);
    }, 500);

    return () => clearTimeout(delay);
  }, [inputValue]);

  return (
    <div>
      <input
        className="h-13 w-full rounded-xl border-0 bg-white px-5 py-1.5 text-base font-bold text-black opacity-80 outline-none focus:opacity-100"
        placeholder="Search"
        onChange={(e) => setInputValue(e.target.value)}
        data-testid="search-input"
      />
    </div>
  );
}
