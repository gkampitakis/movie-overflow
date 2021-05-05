import React from 'react';
import ItemList from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  mockHistoryPush,
  mockPerson,
  mockMovie,
  mockTvSeries
} from '../../setupTests';

describe('ItemList', () => {
  describe('Person item', () => {
    it('Should render consistently', () => {
      const { container } = render(<ItemList item={mockPerson} />);

      expect(container).toMatchSnapshot();
    });

    it('Should render placeholder image', () => {
      mockPerson.profile_path = '';
      const { container } = render(<ItemList item={mockPerson} />);

      expect(container).toMatchSnapshot();
    });

    it('Should navigate to person details', () => {
      render(<ItemList item={mockPerson} />);

      userEvent.click(screen.getByTestId('item-list'));

      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/person/1'
      });
    });
  });

  describe('Movie item', () => {
    it('Should render consistently', () => {
      const { container } = render(<ItemList item={mockMovie} />);

      expect(container).toMatchSnapshot();
    });

    it('Should render placeholder image', () => {
      mockMovie.poster_path = '';
      const { container } = render(<ItemList item={mockMovie} />);

      expect(container).toMatchSnapshot();
    });

    it('Should navigate to person details', () => {
      render(<ItemList item={mockMovie} />);

      userEvent.click(screen.getByTestId('item-list'));

      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/movie/2'
      });
    });
  });

  describe('Tv item', () => {
    it('Should render consistently', () => {
      const { container } = render(<ItemList item={mockTvSeries} />);

      expect(container).toMatchSnapshot();
    });

    it('Should render placeholder image', () => {
      mockTvSeries.poster_path = '';
      const { container } = render(<ItemList item={mockTvSeries} />);

      expect(container).toMatchSnapshot();
    });

    it('Should navigate to person details', () => {
      render(<ItemList item={mockTvSeries} />);

      userEvent.click(screen.getByTestId('item-list'));

      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/tv/3'
      });
    });
  });
});
