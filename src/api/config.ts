export const API_BASE_URL = 'http://localhost:8000/api';

export const GET_TRACKS_URL = (
  page: number,
  sort: string,
  order: string,
  artist: string,
  genre: string
) => {
  let url = `${API_BASE_URL}/tracks?page=${page}`;

  if (sort) {
    url += `&sort=${sort}&order=${order || 'asc'}`;
  }

  if (artist) {
    url += `&artist=${artist}`;
  }

  if (genre) {
    url += `&genre=${genre}`;
  }

  return url;
};

export const GET_TRACK_BY_LIMIT_URL = (limit: number) => {
  return `${API_BASE_URL}/tracks?&limit=${limit}`;
};

export const GET_GENRES_URL = `${API_BASE_URL}/genres`;

export const CREATE_TRACK_URL = `${API_BASE_URL}/tracks`;

export const GET_TRACK_BY_SLUG_URL = (slug: string) => {
  return `${API_BASE_URL}/tracks/${slug}`;
};

export const UPDATE_TRACK_URL = (id: string) => {
  return `${API_BASE_URL}/tracks/${id}`;
};

export const DELETE_TRACK_URL = (id: string) => {
  return `${API_BASE_URL}/tracks/${id}`;
};
