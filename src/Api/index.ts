import HttpClient from './HttpClient';
import config from '../config';
import { MovieDetails, SearchOptions, SearchRequest } from '../types';

export function searchRequest (query: string, page: number, type: SearchOptions) {
  if (type === 'all') {
    return HttpClient.get<SearchRequest>(`https://api.themoviedb.org/3/search/multi?api_key=${config.API_KEY}&query=${query}&page=${page}`);
  }
  return HttpClient.get<SearchRequest>(`https://api.themoviedb.org/3/search/${type}?api_key=${config.API_KEY}&query=${query}&page=${page}`);
}

export function getMovie (id: string) {
  return HttpClient.get<MovieDetails>(`https://api.themoviedb.org/3/movie/${id}?api_key=${config.API_KEY}&append_to_response=credits,images`);
}

export function getPerson (id: string) {
  return HttpClient.get<unknown>(`https://api.themoviedb.org/3/person/${id}?api_key=${config.API_KEY}&append_to_response=combined_credits`);
}