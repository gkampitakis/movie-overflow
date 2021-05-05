import React from 'react';
import Search from '.';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FetchMock } from 'jest-fetch-mock';
import { mockHistoryPush, mockResponseOnce } from '../../setupTests';

let mockPathname = '/';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  }),
  useLocation: () => ({
    pathname: mockPathname
  })
}));
const fetchMock = fetch as FetchMock;

describe('Search', () => {
  beforeEach(() => {
    mockPathname = '/';
    fetchMock.resetMocks();
    mockHistoryPush.mockClear();
    jest.spyOn(Math, 'random').mockImplementation(() => 0);
  });

  describe('When rendering', () => {
    it('Should render consistently', () => {
      const { container } = render(<Search />);

      expect(container).toMatchSnapshot();
    });

    it('Should have focused on search input', () => {
      render(<Search />);

      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toHaveFocus();
    });

    it('Should populate input with url query', () => {
      mockPathname = '/search/mockQuery';
      render(<Search />);

      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toHaveValue('mockQuery');
    });
  });

  it('Should return home', () => {
    render(<Search />);

    const title = screen.getByText(/movie overflow/i);
    const movieOption = screen.getByTestId('Movie-radio');
    const allOption = screen.getByTestId('All-radio');
    const searchInput = screen.getByPlaceholderText('Search...');

    userEvent.click(movieOption);
    userEvent.type(searchInput, 'hello world');
    expect(searchInput).toHaveValue('hello world');
    userEvent.click(title);

    expect(allOption).toBeChecked();
    expect(movieOption).not.toBeChecked();
    expect(searchInput).toHaveValue('');
    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: '/'
    });
  });

  it('Should clear input', () => {
    render(<Search />);
    const clearIcon = screen.getByTestId('clear-icon');
    const searchInput = screen.getByPlaceholderText('Search...');

    userEvent.type(searchInput, 'hello world');
    expect(searchInput).toHaveValue('hello world');

    userEvent.click(clearIcon);

    expect(searchInput).toHaveValue('');
  });

  it('Should trigger a search', () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchIcon = screen.getByTestId('search-icon');

    userEvent.type(searchInput, 'my movie');
    userEvent.click(searchIcon);

    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: '/search/my movie',
      state: { searchBy: 'all' }
    });
  });

  it('Should trigger a search with Enter', () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Search...');

    userEvent.type(searchInput, 'my movie');
    userEvent.type(searchInput, '{enter}');

    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: '/search/my movie',
      state: { searchBy: 'all' }
    });
  });

  describe('Search suggestions', () => {
    it('Should trigger search for suggestions', async () => {
      jest.useFakeTimers();
      mockResponseOnce({
        results: [
          {
            id: 1,
            media_type: 'person',
            name: 'mockActor'
          },
          {
            id: 2,
            media_type: 'tv',
            original_name: 'mockTvSeries'
          },
          {
            id: 3,
            original_title: 'mockMovie'
          }
        ]
      });
      const { container } = render(<Search />);
      const url =
        'https://api.themoviedb.org/3/search/multi?api_key=mockKey&query=my movi&page=1';
      const searchInput = screen.getByPlaceholderText('Search...');

      userEvent.type(searchInput, 'my movie');

      act(() => {
        jest.advanceTimersByTime(502);
      });

      await screen.findByText('mockTvSeries');

      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
      expect(container).toMatchSnapshot();
      jest.useRealTimers();
    });

    it('Should dismiss suggestions with ESC', async () => {
      jest.useFakeTimers();
      mockResponseOnce({
        results: [
          {
            id: 1,
            original_title: 'mockMovie'
          }
        ]
      });
      const { container } = render(<Search />);
      const url =
        'https://api.themoviedb.org/3/search/movie?api_key=mockKey&query=my movi&page=1';
      const searchInput = screen.getByPlaceholderText('Search...');
      const movieOption = screen.getByTestId('Movie-radio');

      userEvent.click(movieOption);
      userEvent.type(searchInput, 'my movie');

      act(() => {
        jest.advanceTimersByTime(502);
      });

      await screen.findByText('mockMovie');

      userEvent.type(searchInput, '{esc}');

      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
      expect(container).toMatchSnapshot();
      jest.useRealTimers();
    });

    it('Should dismiss suggestions when clearing input', async () => {
      jest.useFakeTimers();
      mockResponseOnce({
        results: [
          {
            id: 1,
            name: 'mockActor'
          }
        ]
      });
      const { container } = render(<Search />);
      const url =
        'https://api.themoviedb.org/3/search/person?api_key=mockKey&query=my perso&page=1';
      const searchInput = screen.getByPlaceholderText('Search...');
      const peopleOption = screen.getByTestId('People-radio');
      const clearIcon = screen.getByTestId('clear-icon');

      userEvent.click(peopleOption);

      userEvent.type(searchInput, 'my person');

      act(() => {
        jest.advanceTimersByTime(502);
      });

      await screen.findByText('mockActor');

      userEvent.click(clearIcon);

      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
      expect(container).toMatchSnapshot();
      jest.useRealTimers();
    });

    it('Should navigate to suggestion', async () => {
      jest.useFakeTimers();
      mockResponseOnce({
        results: [
          {
            id: 1,
            media_type: 'person',
            name: 'mockActor'
          },
          {
            id: 2,
            media_type: 'tv',
            original_name: 'mockTvSeries'
          },
          {
            id: 3,
            original_title: 'mockMovie',
            media_type: 'movie'
          }
        ]
      });
      const { container } = render(<Search />);
      const url =
        'https://api.themoviedb.org/3/search/multi?api_key=mockKey&query=my movi&page=1';
      const searchInput = screen.getByPlaceholderText('Search...');

      userEvent.type(searchInput, 'my movie');

      act(() => {
        jest.advanceTimersByTime(502);
      });

      const movieSuggestion = await screen.findByText('mockMovie');

      userEvent.click(movieSuggestion);

      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/movie/3'
      });
      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
      expect(container).toMatchSnapshot();
      jest.useRealTimers();
    });

    it('Should show no suggestions when no results', async () => {
      jest.useFakeTimers();
      mockResponseOnce({
        results: []
      });

      const { container } = render(<Search />);
      const searchInput = screen.getByPlaceholderText('Search...');

      userEvent.type(searchInput, 'my movie');

      act(() => {
        jest.advanceTimersByTime(502);
        expect(container).toMatchSnapshot();
      });

      jest.useRealTimers();
    });
  });
});
