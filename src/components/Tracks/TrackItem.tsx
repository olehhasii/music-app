import { Track } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export default function TrackItem({ track }: { track: Track }) {
  const { id, title, artist, album, genres, slug, coverImage, audioFile, createdAt, updatedAt } =
    track;
  return (
    <li
      className="glass-track flex items-center justify-between px-4 py-2 text-white"
      data-testid={`track-item-${id}`}
    >
      <div className="flex items-center">
        <img
          src={
            coverImage
              ? coverImage
              : 'https://upload.wikimedia.org/wikipedia/commons/b/b6/12in-Vinyl-LP-Record-Angle.jpg'
          }
          alt={title}
          className="max-h-[60px] max-w-[60px] rounded-lg"
        />
        <div className="ml-6 flex flex-col">
          <h3 className="text-xl font-bold" data-testid={`track-item-${id}-title`}>
            {title}
          </h3>
          <span className="text-lg" data-testid={`track-item-${id}-artist`}>
            {artist}
          </span>
          {album && <span className="text-lg">Album: {album}</span>}
        </div>
      </div>
      <div className="flex gap-3">
        {genres.map((genre) => (
          <span key={uuidv4()} className="rounded-lg bg-black px-4 py-1 text-xl">
            {genre}
          </span>
        ))}
      </div>
    </li>
  );
}
