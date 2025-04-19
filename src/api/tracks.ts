import axios from 'axios';
import { GET_TRACKS_URL } from './config';
import { AllTrackResponse } from '../types';

export const getAllTracks = async (): Promise<AllTrackResponse> => {
  const response = await axios.get(GET_TRACKS_URL);
  return response.data;
};
