import React from 'react';
import MovieDetails from '.';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FetchMock } from 'jest-fetch-mock';
import { movieDetailsResponse } from '../../setupTests';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

const fetchMock = fetch as FetchMock;
const mockProps = {
  match: { params: { id: 'mockId' } }
} as any;

describe('MovieDetails', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    mockHistoryPush.mockClear();
    fetchMock.mockResponseOnce(JSON.stringify(movieDetailsResponse), {
      headers: { 'content-type': 'application/json' }
    });
  });
  it('Should show loading', async () => {
    await act(async () => {
      const { container } = render(<MovieDetails {...mockProps} />);

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
});