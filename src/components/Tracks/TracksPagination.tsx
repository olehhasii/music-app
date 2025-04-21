import { v4 as uuidv4 } from 'uuid';
import { PaginationMeta } from '../../types';
import { useTracksStore } from '../../store/TracksStore';

export default function TracksPagination({ metaData }: { metaData: PaginationMeta }) {
  const pagesCount = Array.from({ length: metaData.totalPages }, (_, i) => i + 1);

  const fetchTracks = useTracksStore((state) => state.fetchTracks);
  const setPage = useTracksStore((state) => state.setPage);
  const page = useTracksStore((state) => state.page);

  const handleSelectPage = (page: number) => {
    setPage(page);
    fetchTracks();
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage <= metaData.totalPages) {
      setPage(nextPage);
      fetchTracks();
    }
  };

  const handlePrevPage = () => {
    const prevPage = page - 1;
    if (prevPage >= 1) {
      setPage(prevPage);
      fetchTracks();
    }
  };

  if (metaData.totalPages === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center gap-4 text-white" data-testid="pagination">
      <button
        className="glass-btn cursor-pointer p-3 disabled:cursor-not-allowed"
        disabled={page === 1}
        aria-disabled={page === 1}
        onClick={handlePrevPage}
        data-testid="pagination-prev"
      >
        <img src="/assets/left.svg" />
      </button>
      <div className="glass flex min-w-[500px] items-center justify-center gap-8 px-4 py-2">
        {pagesCount.map((num) => {
          const isActive = page === num;

          return (
            <button
              key={uuidv4()}
              className={`${isActive ? 'bg-[#e4e3de] text-black' : ''} flex h-4 w-4 cursor-pointer items-center justify-center rounded-full p-5 text-xl`}
              disabled={isActive}
              aria-disabled={isActive}
              onClick={() => handleSelectPage(num)}
            >
              {num}
            </button>
          );
        })}
      </div>
      <button
        className="glass-btn cursor-pointer rounded-full p-3 disabled:cursor-not-allowed"
        disabled={page === metaData.totalPages}
        aria-disabled={page === metaData.totalPages}
        onClick={handleNextPage}
        data-testid="pagination-next"
      >
        <img src="/assets/right.svg" />
      </button>
    </div>
  );
}
