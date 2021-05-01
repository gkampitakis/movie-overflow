export type Movie = {
  id: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  media_type: 'movie';
};

export type Series = {
  id: string;
  popularity: number;
  name: string;
  original_name: string;
  poster_path: string;
  overview: string;
  original_name: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  media_type: 'tv';
};

export type Actor = {
  id: string;
  name: string;
  popularity: string;
  known_for_department: string;
  profile_path: string;
  media_type: 'person';
  known_for: { original_title: string }[]
};

export type SearchResult = Actor | Movie | Series;

export type SearchOptions = 'all' | 'movie' | 'tv' | 'person';
