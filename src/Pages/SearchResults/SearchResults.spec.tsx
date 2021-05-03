import React from 'react';
import SearchResults from '.';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FetchMock } from 'jest-fetch-mock';
import {
  searchResponse,
  mockResponseOnce,
  mockDelayedResponseOnce,
  scrollSpy
} from '../../setupTests';

const fetchMock = fetch as FetchMock;
const mockProps = {
  match: {
    params: {
      query: 'mockQuery'
    }
  },
  location: {
    state: undefined
  }
} as any;

describe('SearchResults', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    scrollSpy.mockClear();
    mockResponseOnce(searchResponse.response);
  });

  it('Should show loading', async () => {
    fetchMock.resetMocks();
    mockDelayedResponseOnce({});

    await act(async () => {
      const { container } = render(<SearchResults {...mockProps} />);

      await screen.findByTestId('loader');

      expect(container).toMatchSnapshot();
    });
  });

  it('Should render consistently', async () => {
    const url =
      'https://api.themoviedb.org/3/search/multi?api_key=mockKey&query=mockQuery&page=1';
    await act(async () => {
      const { container } = render(<SearchResults {...mockProps} />);

      await screen.findByAltText(/mockTitle/i);

      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
      expect(container).toMatchSnapshot();
    });
  });

  it('Should show no results message', async () => {
    fetchMock.resetMocks();
    mockResponseOnce(searchResponse.noData);

    await act(async () => {
      const { container } = render(<SearchResults {...mockProps} />);

      await screen.findByAltText(/no results/i);

      expect(container).toMatchSnapshot();
    });
  });

  it('Should change page', async () => {
    mockResponseOnce(searchResponse.response);
    const url1 =
        'https://api.themoviedb.org/3/search/multi?api_key=mockKey&query=mockQuery&page=1',
      url2 =
        'https://api.themoviedb.org/3/search/multi?api_key=mockKey&query=mockQuery&page=2';
    await act(async () => {
      const { container } = render(<SearchResults {...mockProps} />);

      await screen.findByAltText(/mockTitle/i);
      const nextPage = screen.getByText(/next/i);

      userEvent.click(nextPage);

      await screen.findByAltText(/mockTitle/i);

      expect(fetchMock).toHaveBeenCalledWith(url1, {
        method: 'GET'
      });
      expect(fetchMock).toHaveBeenCalledWith(url2, {
        method: 'GET'
      });
      expect(scrollSpy).toBeCalledWith({
        top: 0,
        behavior: 'smooth'
      });
      expect(container).toMatchSnapshot();
    });
  });

  it('Should query by person', async () => {
    const props = {
        ...mockProps,
        location: { state: { searchBy: 'person' } }
      },
      url =
        'https://api.themoviedb.org/3/search/person?api_key=mockKey&query=mockQuery&page=1';

    await act(async () => {
      render(<SearchResults {...props} />);

      await screen.findByAltText(/mockTitle/i);

      expect(fetchMock).toHaveBeenCalledWith(url, {
        method: 'GET'
      });
    });
  });
});
