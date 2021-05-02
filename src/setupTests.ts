// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

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