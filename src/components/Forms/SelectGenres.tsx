import { useEffect, useRef, useState } from 'react';
import { getAllGenres } from '../../api/tracks';
import { ClipLoader } from 'react-spinners';

export default function SelectGenres({
  onSelectGenre,
  selectedGenres,
  error,
  onSetGenresError,
}: {
  onSelectGenre: (genres: string[]) => void;
  selectedGenres: string[];
  error: string;
  onSetGenresError: (error: string) => void;
}) {
  const [genres, setGenres] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const data = await getAllGenres();
        setGenres(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllTracks();
  }, []);

  const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    onSelectGenre([...selectedGenres, e.target.value]);
    if (selectRef.current) {
      selectRef.current.value = '';
    }
    onSetGenresError('');
  };

  const handleRemoveGenre = (genreToRemove: string): void => {
    onSelectGenre(selectedGenres.filter((genre) => genre !== genreToRemove));
  };

  if (isLoading) {
    return (
      <div data-loading="true">
        <ClipLoader />
      </div>
    );
  }

  return (
    <div>
      <select
        className="h-14 w-full rounded-xl border-0 bg-white px-5 py-1.5 text-base font-bold text-black opacity-70 outline-none focus:opacity-100"
        onChange={handleSelectGenre}
        ref={selectRef}
        data-testid="genre-selector"
      >
        <option value="" disabled selected>
          Select one/multiple genres
        </option>
        {genres?.map((genre) => {
          return (
            <option key={genre} value={genre} disabled={selectedGenres.includes(genre)}>
              {genre}
            </option>
          );
        })}
      </select>
      {selectedGenres.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedGenres.map((selectedGenre) => {
            return (
              <div
                className="flex items-center rounded-lg bg-[#2d2d2d] px-3 py-1"
                key={selectedGenre}
              >
                <span>{selectedGenre}</span>
                <button
                  className="ml-3 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-600 p-2"
                  onClick={() => handleRemoveGenre(selectedGenre)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      )}
      {error && (
        <span className="ml-2 font-bold text-red-500" data-testid="error-genre">
          {error}
        </span>
      )}
    </div>
  );
}
