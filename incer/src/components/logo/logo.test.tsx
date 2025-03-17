import { render, screen } from '@testing-library/react';

import Logo from '.';

describe('LOGO', () => {
  it('Should render as expected', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Logo />);
    screen.getByAltText(/logotipo/i);
  });
});
