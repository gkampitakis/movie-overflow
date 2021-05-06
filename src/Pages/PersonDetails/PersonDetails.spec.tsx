import React from 'react';
import PersonDetails from '.';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FetchMock } from 'jest-fetch-mock';
import {
  mockDelayedResponseOnce,
  mockHistoryPush,
  mockPerson,
  mockResponseOnce
} from '../../setupTests';

const fetchMock = fetch as FetchMock;
const mockProps = {
  match: { params: { id: 'mockId' } }
} as any;

describe('PersonDetails', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    mockHistoryPush.mockClear();
    mockResponseOnce(mockPerson);
  });

  it('Should show loading', async () => {
    fetchMock.resetMocks();
    mockDelayedResponseOnce({});
    await act(async () => {
      const { container } = render(<PersonDetails {...mockProps} />);

      await screen.findByTestId('loader');

      expect(container).toMatchSnapshot();
    });
  });

  it('Should render consistently', async () => {
    await act(async () => {
      const { container } = render(<PersonDetails {...mockProps} />);

      await screen.findByText(/voldemort/i);

      expect(container).toMatchSnapshot();
    });
  });

  it('Should go to correct page', async () => {
    await act(async () => {
      render(<PersonDetails {...mockProps} />);

      await screen.findByText(/mockName/i);
      const cast = screen.getByText(/voldemort/i);
      const crew = screen.getByText(/wizard/i);

      userEvent.click(cast);
      userEvent.click(crew);

      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/movie/1'
      });
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/tv/3'
      });
    });
  });

  it('Should redirect to page not found', async () => {
    fetchMock.resetMocks();
    mockResponseOnce('{}', 404);
    await act(async () => {
      render(<PersonDetails {...mockProps} />);

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
      render(<PersonDetails {...mockProps} />);

      setImmediate(() => {
        expect(logSpy).toHaveBeenCalled();
      });
    });
  });

  it('Should render placeholder image', async () => {
    fetchMock.resetMocks();
    const response = { ...mockPerson };
    response.profile_path = '';
    mockResponseOnce(response);

    await act(async () => {
      const { container } = render(<PersonDetails {...mockProps} />);

      await screen.findByText(/mockName/i);

      expect(container).toMatchSnapshot();
    });
  });

  it('Should not render credits column if no data', async () => {
    fetchMock.resetMocks();
    const response = { ...mockPerson };
    response.combined_credits.cast = [];
    response.combined_credits.crew = [];
    mockResponseOnce(response);

    await act(async () => {
      const { container } = render(<PersonDetails {...mockProps} />);

      await screen.findByText(/mockName/i);

      expect(container).toMatchSnapshot();
    });
  });
});
