import HttpClient from './HttpClient';
import config from '../config';
import { SearchOptions } from '../types';

export function searchRequest<T> (query: string, page: number, type: SearchOptions) {
  if (type === 'all') {
    return HttpClient.get<T>(`https://api.themoviedb.org/3/search/multi?api_key=${config.API_KEY}&query=${query}&page=${page}`);
  }
  return HttpClient.get<T>(`https://api.themoviedb.org/3/search/${type}?api_key=${config.API_KEY}&query=${query}&page=${page}`);
}