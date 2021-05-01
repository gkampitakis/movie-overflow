import HttpClient from './HttpClient';
import { SearchOptions } from '../types';

const API_KEY = 'f5249e8d134d4219fbe03bc1319f6cff';

export function searchRequest<T> (query: string, page: number, type: SearchOptions) {
  if (type === 'all') {
    return HttpClient.get<T>(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`);
  }
  return HttpClient.get<T>(`https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${query}&page=${page}`);
}