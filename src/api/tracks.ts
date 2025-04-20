import axios, { AxiosResponse } from 'axios';
import { CREATE_TRACK_URL, GET_GENRES_URL, GET_TRACKS_URL } from './config';
import { AllTrackResponse, TrackFormData } from '../types';

export const getAllTracks = async (): Promise<AllTrackResponse> => {
  const response = await axios.get(GET_TRACKS_URL);
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
  console.log(response);
  return response;
};
