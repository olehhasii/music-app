import { useEffect, useState } from 'react';
import { getAllTracks } from '../../api/tracks';
import { PaginationMeta, Track } from '../../types';
import TrackItem from './TrackItem';

export default function TrackList({ isLoading, tracks }: { isLoading: boolean; tracks: Track[] }) {
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="glass scrollable-glass max-h-[65vh] w-full overflow-y-auto px-4 py-2">
      <ul className="flex flex-col gap-4">
        {tracks.map((trackItem) => {
          return <TrackItem key={trackItem.id} track={trackItem} />;
        })}
      </ul>
    </div>
  );
}
