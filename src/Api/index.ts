import HttpClient from './HttpClient';

const API_KEY = 'f5249e8d134d4219fbe03bc1319f6cff';

export function searchRequest<T> (query: string, page: number) {
  return HttpClient.get<T>(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&page=${page}`);
}