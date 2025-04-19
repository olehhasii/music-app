import { useEffect, useState } from 'react';
import TrackList from './TrackList';
import TracksPagination from './TracksPagination';
import { PaginationMeta, Track } from '../../types';
import { getAllTracks } from '../../api/tracks';

export default function TracksSection() {
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

  return (
    <section className="mt-6 flex flex-col items-center">
      <TrackList tracks={tracks} isLoading={isLoading} />
      {paginationMetaData && <TracksPagination metaData={paginationMetaData} />}
    </section>
  );
}
