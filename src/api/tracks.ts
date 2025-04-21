import axios, { AxiosResponse } from 'axios';
import {
  CREATE_TRACK_URL,
  DELETE_TRACK_URL,
  GET_GENRES_URL,
  GET_TRACK_BY_SLUG_URL,
  GET_TRACKS_URL,
  UPDATE_TRACK_URL,
} from './config';
import { AllTrackResponse, Track, TrackFormData } from '../types';

export const getAllTracks = async (page: number): Promise<AllTrackResponse> => {
  const response = await axios.get(GET_TRACKS_URL(page));
  return response.data;
};

export const getAllGenres = async (): Promise<string[]> => {
  const response = await axios.get(GET_GENRES_URL);
  return response.data;
};

export const createTrack = async (data: TrackFormData): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(CREATE_TRACK_URL, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const getTrackBySlug = async (slug: string): Promise<Track> => {
  const response = await axios.get(GET_TRACK_BY_SLUG_URL(slug));
  return response.data;
};

export const updateTrack = async (
  id: string,
  data: TrackFormData
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.put(UPDATE_TRACK_URL(id), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const deleteTrack = async (id: string): Promise<AxiosResponse<any, any>> => {
  const response = await axios.delete(DELETE_TRACK_URL(id));

  return response;
};
