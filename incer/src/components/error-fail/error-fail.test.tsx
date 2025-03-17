import { render, screen } from '@testing-library/react';

import ErrorFail from '.';

describe('Error Fail', () => {
  it('Should render as expected', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<ErrorFail />);
    screen.getByAltText(/error-icon/i);
  });
});
