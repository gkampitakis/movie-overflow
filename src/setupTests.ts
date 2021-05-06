// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

/**
 * In jest scrollTo is undefined so we are defining it and 
 * assigning a spy
 */
export const scrollSpy = jest.fn();
Element.prototype.scrollTo = scrollSpy;

/**
 * Mocking react router dom history and adding a spy
 */
export const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));
/**
 * Mocking config globally as we don't want to have our 
 * actual key in tests
 */
jest.mock('./config', () => ({ API_KEY: 'mockKey' }));

export function mockResponseOnce (response: any, status = 200) {
  fetchMock.mockResponseOnce(JSON.stringify(response), { headers: { 'content-type': 'application/json' }, status });
}

export function mockDelayedResponseOnce (response: any) {
  fetchMock.mockResponseOnce(
    () =>
      new Promise<string>((resolve) => {
        setTimeout(() => resolve(JSON.stringify(response)), 1000);
      })
  );
}

/**
 * Mock responses for the test suite
 */

export const movieDetailsResponse = {
  id: 'mockId',
  original_title: 'mockTitle',
  runtime: 100,
  genres: [{ name: 'test' }],
  poster_path: '/mock_path',
  tagline: 'mockTagLine',
  overview: 'mockOverview',
  status: 'mockStatus',
  release_date: 'mockDate',
  vote_average: 100,
  images: {
    posters: [
      {
        file_path: '/mock_image_path'
      }
    ]
  },
  credits: {
    cast: [
      {
        id: 'id1',
        profile_path: 'cast_path',
        original_name: 'mockName',
        character: 'character1'
      },
      {
        id: 'id2',
        profile_path: null,
        original_name: 'mockName2',
        character: 'character2'
      }
    ],
    crew: [
      {
        id: 'crewId1',
        profile_path: 'crew_path',
        original_name: 'crewMockName',
        job: 'job1'
      },
      {
        id: 'crewId2',
        profile_path: null,
        original_name: 'crewMockName2',
        job: 'job2'
      }
    ]
  }
};

export const searchResponse = {
  noData: {
    total_pages: 0,
    results: []
  },
  response: {
    total_pages: 10,
    results: [{
      id: 1,
      poster_path: '/post_path',
      original_title: 'mockTitle',
      release_date: 'mockDate',
      overview: 'mockOverview',
      media_type: 'movie'
    }]
  }
};

export const tvSeriesDetailsResponse = {
  id: 'mockId',
  original_name: 'mockTitle',
  genres: [{ name: 'test' }],
  poster_path: '/mock_path',
  tagline: 'mockTagLine',
  overview: 'mockOverview',
  status: 'mockStatus',
  last_air_date: 'mockDate',
  number_of_seasons: 10,
  seasons: [{
    id: 1,
    name: 'mockSeason1',
    overview: 'mockOverview1',
    poster_path: 'mockPosterPath1',
    episode_count: 10
  },
  {
    id: 2,
    name: 'mockSeason2',
    overview: 'mockOverview2',
    poster_path: 'mockPosterPath2',
    episode_count: 15
  }],
  vote_average: 100,
  credits: {
    cast: [
      {
        id: 'id1',
        profile_path: 'cast_path',
        original_name: 'mockName',
        character: 'character1'
      },
      {
        id: 'id2',
        profile_path: null,
        original_name: 'mockName2',
        character: 'character2'
      }
    ],
    crew: [
      {
        id: 'crewId1',
        profile_path: 'crew_path',
        original_name: 'crewMockName',
        job: 'job1'
      },
      {
        id: 'crewId2',
        profile_path: null,
        original_name: 'crewMockName2',
        job: 'job2'
      }
    ]
  }
};

export const mockPerson = {
  id: '1',
  media_type: 'person' as const,
  known_for: [
    {
      name: 'mockTvSeries'
    },
    {
      original_title: 'mockMovie'
    }
  ] as any,
  biography: "mockBiography",
  deathday: "deathDay",
  place_of_birth: "mockPlace",
  popularity: '100',
  profile_path: 'mock_path',
  name: 'mockName',
  known_for_department: 'Actor',
  combined_credits: {
    cast: [{
      id: '1',
      media_type: 'movie',
      poster_path: 'mockPath',
      character: 'voldemort',
      original_title: 'mockTitle',
    },
    {
      id: '2',
      media_type: 'tv',
      poster_path: 'mockPath2',
      character: 'potter',
      original_name: 'mockTitle2'
    }],
    crew: [{
      id: '3',
      media_type: 'tv',
      poster_path: 'mockPath3',
      job: 'wizard',
      original_title: 'original_title3'
    },
    {
      id: '4',
      media_type: 'movie',
      poster_path: 'mockPath4',
      job: 'director',
      original_name: 'original_name4'
    }]
  }
};

export const mockMovie = {
  id: '2',
  poster_path: 'mock_path',
  original_title: 'mockTitle',
  release_date: 'mockDate',
  overview: 'mockOverview',
  media_type: 'movie' as const,
} as any;

export const mockTvSeries = {
  id: '3',
  original_name: 'mockTitle',
  first_air_data: 'mockDate',
  overview: 'mockOverview',
  poster_path: 'mock_path',
  media_type: 'tv' as const,
} as any;