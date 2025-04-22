import { ClipLoader } from 'react-spinners';
import { Track } from '../../types';
import NoTracks from './NoTracks';
import TrackItem from './TrackItem';

export default function TrackList({ isLoading, tracks }: { isLoading: boolean; tracks: Track[] }) {
  return (
    <div className="glass scrollable-glass relative max-h-[64vh] min-h-[64vh] w-full items-center justify-center overflow-y-auto px-4 py-2 max-md:max-h-[50%] max-md:min-h-[200px]">
      {isLoading && (
        <div
          data-loading="true"
          data-testid="loading-tracks"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        >
          <ClipLoader size={80} />
        </div>
      )}
      {tracks.length === 0 && !isLoading && <NoTracks />}
      {tracks.length > 0 && (
        <ul className="flex flex-col gap-4">
          {tracks.map((trackItem) => {
            return <TrackItem key={trackItem.id} track={trackItem} />;
          })}
        </ul>
      )}
    </div>
  );
}
