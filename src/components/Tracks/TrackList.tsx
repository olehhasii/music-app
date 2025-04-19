import { useEffect, useState } from 'react';
import { getAllTracks } from '../../api/tracks';
import { PaginationMeta, Track } from '../../types';
import TrackItem from './TrackItem';

export default function TrackList() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [paginationMetaData, setPaginationMetaData] = useState<PaginationMeta>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const { data, meta } = await getAllTracks();
        setTracks(data);
        setPaginationMetaData(meta);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllTracks();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="glass px-4 py-2">
      <ul>
        {tracks.map((trackItem) => {
          return <TrackItem track={trackItem} />;
        })}
      </ul>
    </div>
  );
}
