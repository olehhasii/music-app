import { useEffect, useState } from 'react';
import { useTracksStore } from '../../store/TracksStore';
import { getAllGenres, getAllTrackByLimit } from '../../api/tracks';
import { Track } from '../../types';
import { ClipLoader } from 'react-spinners';

export default function Filter() {
  const fetchTracks = useTracksStore((state) => state.fetchTracks);
  const setPage = useTracksStore((state) => state.setPage);
  const paginationData = useTracksStore((state) => state.paginationMetaData);

  const [genres, setGenres] = useState<string[]>([]);
  const [artist, setArtist] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = new URLSearchParams(window.location.search);
  const initialArtist = searchParams.get('artist') || '';
  const initialGenre = searchParams.get('genre') || '';

  const [selectedArtist, setSelectedArtist] = useState(initialArtist);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);

  const updateURL = (key: string, value: string) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleAtristSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newArtist = e.target.value;
    setSelectedArtist(newArtist);
    updateURL('artist', newArtist);
    setPage(1);
    fetchTracks();
  };

  const handleGenreSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenre = e.target.value;
    setSelectedGenre(newGenre);
    updateURL('genre', newGenre);
    setPage(1);
    fetchTracks();
  };

  useEffect(() => {
    const fetchAllForFilters = async () => {
      console.log('finaly');
      try {
        const { data: allTracks } = await getAllTrackByLimit();

        const artists = Array.from(
          new Set(allTracks.map((track: Track) => track.artist).filter(Boolean))
        );

        setArtist(artists as string[]);
      } catch (e) {
        console.error('Failed to fetch all tracks for filters', e);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAllGenres = async () => {
      try {
        const data = await getAllGenres();
        setGenres(data);
      } catch (error) {
        console.log('oops');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (paginationData?.total) {
      fetchAllForFilters();
      fetchAllGenres();
    }
  }, [paginationData]);

  if (isLoading && paginationData?.total) {
    return (
      <div data-loading="true">
        <ClipLoader />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 max-md:gap-2">
      <span>Filter By:</span>
      <div className="flex">
        <select
          className="glass-select block w-[100px] rounded-s-2xl border-r-1 border-black border-s-gray-100 bg-gray-50 p-2.5 text-black placeholder-gray-400 outline-none focus:border-1 focus:border-white max-md:px-2 max-md:py-1 max-md:text-sm"
          onChange={handleAtristSelected}
          value={selectedArtist}
          data-testid="filter-artist"
        >
          <option value="">Artist</option>
          {artist?.map((artist) => (
            <option key={artist} value={artist}>
              {artist}
            </option>
          ))}
        </select>
        <select
          className="glass-select block w-full rounded-e-2xl border-gray-300 border-s-gray-100 bg-gray-50 p-2.5 text-black placeholder-gray-400 outline-none focus:border-1 focus:border-white max-md:px-2 max-md:py-1 max-md:text-sm"
          onChange={handleGenreSelected}
          value={selectedGenre}
          data-testid="filter-genre"
        >
          <option value="">Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
