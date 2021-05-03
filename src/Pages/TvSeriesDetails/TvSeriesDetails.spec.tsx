import React from 'react';
import TvSeriesDetails from '.';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FetchMock } from 'jest-fetch-mock';
import {
  mockResponseOnce,
  mockDelayedResponseOnce,
  mockHistoryPush,
  tvSeriesDetailsResponse
} from '../../setupTests';

const fetchMock = fetch as FetchMock;
const mockProps = {
  match: { params: { id: 'mockId' } }
} as any;

describe('TvSeriesDetails', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    mockHistoryPush.mockClear();
    mockResponseOnce(tvSeriesDetailsResponse);
  });

  it('Should show loading', async () => {
    fetchMock.resetMocks();
    mockDelayedResponseOnce({});
    await act(async () => {
      const { container } = render(<TvSeriesDetails {...mockProps} />);

      await screen.findByTestId('loader');

      expect(container).toMatchSnapshot();
    });
  });

  it('Should render consistently', async () => {
    await act(async () => {
      const { container } = render(<TvSeriesDetails {...mockProps} />);

      await screen.findByText(/mockTitle/i);

      expect(container).toMatchSnapshot();
    });
  });

  it("Should go to person's page", async () => {
    await act(async () => {
      render(<TvSeriesDetails {...mockProps} />);

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

  it('Should not try to render crew if no resources are returned from api', async () => {
    fetchMock.resetMocks();
    const response = { ...tvSeriesDetailsResponse };
    response.credits.crew = [];
    mockResponseOnce(response);
    await act(async () => {
      const { container } = render(<TvSeriesDetails {...mockProps} />);

      await screen.findByText(/mockTitle/i);

      expect(screen.queryByText('Crew')).toBeNull();
      expect(container).toMatchSnapshot();
    });
  });

  it('Should change selected season', async () => {
    await act(async () => {
      const { container } = render(<TvSeriesDetails {...mockProps} />);

      await screen.findByText(/mockTitle/i);

      const seasonBtn = screen.getByAltText('mockSeason2');
      userEvent.click(seasonBtn);

      expect(screen.queryByText('mockOverview2')).toBeDefined();
      expect(container).toMatchSnapshot();
    });
  });

  it('Should redirect to page not found', async () => {
    fetchMock.resetMocks();
    mockResponseOnce('{}', 404);
    await act(async () => {
      render(<TvSeriesDetails {...mockProps} />);

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
      render(<TvSeriesDetails {...mockProps} />);

      setImmediate(() => {
        expect(logSpy).toHaveBeenCalled();
      });
    });
  });
});
