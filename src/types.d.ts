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

export type Person = {
  id: string;
  name: string;
  popularity: string;
  known_for_department: string;
  profile_path: string;
  media_type: 'person';
  known_for: { original_title: string; name: string }[]
};

export type SearchResult = Person | Movie | Series;

export type SearchOptions = 'all' | 'movie' | 'tv' | 'person';

export type SearchRequest = {
  results: SearchResult[];
  total_pages: number;
  page: number;
};

export type MovieDetails = {
  id: string;
  budget: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  genres: {
    id: string;
    name: string;
  }[];
  release_date: string;
  runtime: number;
  revenue: number;
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: {
      id: string;
      known_for_department: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      character: string;
    }[],
    crew: {
      id: string;
      known_for_department: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      department: string;
      job: string;
    }[]
  };
  images: {
    posters: {
      file_path: string;
    }[]
  };
}

export type TvSeriesDetails = {
  id: string;
  first_air_date: string;
  poster_path: string;
  genres: {
    id: string;
    name: string;
  }[];
  overview: string;
  tagline: string;
  status: string;
  last_air_date: string;
  original_name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  vote_average: number;
  vote_count: number;
  seasons: {
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  credits: {
    cast: {
      id: string;
      known_for_department: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      character: string;
    }[];
    crew: {
      id: string;
      known_for_department: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      department: string;
      job: string;
    }[];
  };
};

export type PersonDetails = {
  id: string;
  biography: string;
  birthday: string;
  deathday: string;
  known_for_department: string;
  place_of_birth: string;
  name: string;
  popularity: string;
  profile_path: string;
  combined_credits: {
    cast: (Movie & {
      character: string;
    }) | [],
    crew: []
  }
};

export type SearchResultsProps = RouteComponentProps<
  {
    query: string;
  },
  any,
  {
    searchBy: SearchOptions;
  }
>;