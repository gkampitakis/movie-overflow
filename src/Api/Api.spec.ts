import HttpClient from './HttpClient';
import { searchRequest, getMovie, getPerson } from '.';
import { FetchMock } from "jest-fetch-mock";
import { mockResponseOnce } from '../setupTests';

const fetchMock = fetch as FetchMock;

jest.mock('../config', () => ({ API_KEY: 'mockKey' }));

describe('API', () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('HttpClient', () => {

    describe('GET', () => {
      it('Should do a GET request and return response', async () => {
        mockResponseOnce({ mock: 'response' });
        const response = await HttpClient.get('mockUrl.com');

        expect(response).toEqual({
          mock: 'response'
        });
        expect(fetchMock).toHaveBeenCalledWith('mockUrl.com', {
          method: 'GET'
        });
      });

      it('Should reject when status >=400', () => {
        mockResponseOnce({ mock: 'response' }, 400);

        expect(HttpClient.get('mockUrl.com')).rejects.toEqual({
          mock: 'response',
          status: 400
        });
      });

      it('Should reject if non JSON response', () => {
        fetchMock.mockResponseOnce('Error', { status: 502 });

        expect(HttpClient.get('mockUrl.com')).rejects.toEqual({
          message: 'Error',
          status: 502
        });
      });

      it('Should reject if non JSON response with default message', () => {
        fetchMock.mockResponseOnce('', { status: 502 });

        expect(HttpClient.get('mockUrl.com')).rejects.toEqual({
          message: 'An unknown error occurred',
          status: 502
        });
      });
    });

    describe('POST', () => {
      it('Should do a POST request and return response', async () => {
        mockResponseOnce({ mock: 'response' });

        const response = await HttpClient.post('mockUrl.com', { body: { data: 'mock' } });
        expect(response).toEqual({
          mock: 'response'
        });
        expect(fetchMock).toHaveBeenCalledWith('mockUrl.com', {
          method: 'POST',
          body: JSON.stringify({ data: 'mock' }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      });
    });
  });

  describe('searchRequest', () => {
    it('Should call fetch with correct params for multi request', async () => {
      mockResponseOnce({ mock: 'response' });

      const url = 'https://api.themoviedb.org/3/search/multi?api_key=mockKey&query=test&page=1'
      await searchRequest('test', 1, 'all');
      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
    });

    it('Should call fetch with correct params for person request', async () => {
      mockResponseOnce({ mock: 'response' });

      const url = 'https://api.themoviedb.org/3/search/person?api_key=mockKey&query=test&page=1';
      await searchRequest('test', 1, 'person');
      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
    });
  });

  describe('getMovie', () => {
    it('Should call fetch with correct params', async () => {
      mockResponseOnce({ mock: 'response' });

      const url = 'https://api.themoviedb.org/3/movie/mockId?api_key=mockKey&append_to_response=credits,images';
      await getMovie('mockId');
      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
    });
  });

  describe('getPerson', () => {
    it('Should call fetch with correct params', async () => {
      mockResponseOnce({ mock: 'response' });

      const url = 'https://api.themoviedb.org/3/person/mockId?api_key=mockKey&append_to_response=combined_credits';
      await getPerson('mockId');
      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
    });
  });
});
