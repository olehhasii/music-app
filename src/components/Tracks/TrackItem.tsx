import { Track } from '../../types';

export default function TrackItem({ track }: { track: Track }) {
  const { id, title, artist, album, genres, slug, coverImage, audioFile, createdAt, updatedAt } =
    track;
  return (
    <li className="flex text-white" data-testid={`track-item-${id}`}>
      <img src={coverImage} alt={title} className="max-w-[90px] rounded-lg" />
      <div className="ml-6 flex flex-col">
        <h3 className="text-2xl font-bold" data-testid={`track-item-${id}-title`}>
          {title}
        </h3>
        <span className="text-lg" data-testid={`track-item-${id}-artist`}>
          {artist}
        </span>
        <span className="text-lg">Album: {album}</span>
      </div>
    </li>
  );
}
