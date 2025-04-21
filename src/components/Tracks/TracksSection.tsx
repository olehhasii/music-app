import { useEffect } from 'react';
import TrackList from './TrackList';
import TracksPagination from './TracksPagination';

import TracksActions from './TracksActions';
import { useTracksStore } from '../../store/TracksStore';

export default function TracksSection() {
  //const [tracks, setTracks] = useState<Track[]>([]);
  //const [paginationMetaData, setPaginationMetaData] = useState<PaginationMeta>();
  //const [isLoading, setIsLoading] = useState(true);

  const { tracks, paginationMetaData, isLoading, fetchTracks } = useTracksStore();

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <section className="mt-6 flex flex-col items-center">
      <div className="w-full">
        <TracksActions />
        <TrackList tracks={tracks} isLoading={isLoading} />
      </div>
      {paginationMetaData && <TracksPagination metaData={paginationMetaData} />}
    </section>
  );
}
