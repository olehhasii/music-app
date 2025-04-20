export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  slug: string;
  coverImage: string;
  audioFile: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type AllTrackResponse = {
  data: Track[];
  meta: PaginationMeta;
};

export type TrackFormData = {
  title: string;
  artist: string;
  album: string;
  coverImage: string;
  genres?: string[];
};
