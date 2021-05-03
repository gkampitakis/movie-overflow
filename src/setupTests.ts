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