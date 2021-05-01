import React from 'react';
import PageNotFound from '.';
import { render } from '@testing-library/react';

describe('PageNotFound', () => {
  it('Should render consistently', () => {
    const { container } = render(<PageNotFound />);

    expect(container).toMatchSnapshot();
  });
});
