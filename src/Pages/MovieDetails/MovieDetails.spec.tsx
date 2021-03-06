import React from 'react';
import MovieDetails from '.';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FetchMock } from 'jest-fetch-mock';
import {
  movieDetailsResponse,
  mockResponseOnce,
  mockDelayedResponseOnce,
  mockHistoryPush
} from '../../setupTests';

const fetchMock = fetch as FetchMock;
const mockProps = {
  match: { params: { id: 'mockId' } }
} as any;

describe('MovieDetails', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    mockHistoryPush.mockClear();
    mockResponseOnce(movieDetailsResponse);
  });
  it('Should show loading', async () => {
    fetchMock.resetMocks();
    mockDelayedResponseOnce({});
    await act(async () => {
      const { container } = render(<MovieDetails {...mockProps} />);

      await screen.findByTestId('loader');

      expect(container).toMatchSnapshot();
    });
  });

  it('Should render consistently', async () => {
    await act(async () => {
      const { container } = render(<MovieDetails {...mockProps} />);

      await screen.findByText(/mockTitle/i);

      expect(container).toMatchSnapshot();
    });
  });

  it('Should open new tab with image', async () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation();

    await act(async () => {
      render(<MovieDetails {...mockProps} />);

      await screen.findByText(/mockTitle/i);
      const img = screen.getAllByAltText(/mockTitle/i);

      userEvent.click(img[1]);

      expect(openSpy).toHaveBeenCalledWith(
        'https://image.tmdb.org/t/p/original/mock_image_path',
        '_blank'
      );
    });
  });

  it("Should go to person's page", async () => {
    await act(async () => {
      render(<MovieDetails {...mockProps} />);

      await screen.findByText(/mockTitle/i);
      const cast = screen.getByAltText('mockName');
      const crew = screen.getByAltText('crewMockName2');

      userEvent.click(cast);
      userEvent.click(crew);

      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/person/id1'
      });
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/person/crewId2'
      });
    });
  });

  it('Should redirect to page not found', async () => {
    fetchMock.resetMocks();
    mockResponseOnce('{}', 404);
    await act(async () => {
      render(<MovieDetails {...mockProps} />);

      setImmediate(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith({
          pathname: '/notFound'
        });
      });
    });
  });

  it('Should log in case of api error', async () => {
    fetchMock.resetMocks();
    mockResponseOnce({ message: 'mockError' }, 400);
    const logSpy = jest.spyOn(console, 'error');

    await act(async () => {
      render(<MovieDetails {...mockProps} />);

      setImmediate(() => {
        expect(logSpy).toHaveBeenCalled();
      });
    });
  });

  it('Should load default values', async () => {
    fetchMock.resetMocks();
    const response = { ...movieDetailsResponse };
    response.poster_path = '';
    response.genres = [];
    mockResponseOnce(response);

    await act(async () => {
      const { container } = render(<MovieDetails {...mockProps} />);

      await screen.findByText(/mockTitle/i);

      expect(container).toMatchSnapshot();
    });
  });

  it('Should not render credits column if no data', async () => {
    fetchMock.resetMocks();
    const response = { ...movieDetailsResponse };
    response.credits.cast = [];
    response.credits.crew = [];
    mockResponseOnce(response);

    await act(async () => {
      const { container } = render(<MovieDetails {...mockProps} />);

      await screen.findByText(/mockTitle/i);

      expect(container).toMatchSnapshot();
    });
  });
});
