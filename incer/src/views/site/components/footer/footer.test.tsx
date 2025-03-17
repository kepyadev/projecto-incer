import { render, screen } from '@testing-library/react';
import React from 'react';

import SiteFooter from '.';

describe('SITE FOOTER', () => {
  const makeSut = () => render(<SiteFooter />);
  it('Should render as expected', () => {
    makeSut();
    screen.getByAltText(/logotipo/i);
    screen.getByText(/endereço/i);
    screen.getByText(/luanda, talatona/i);
    screen.getByText(/município talatona via as21/i);
    screen.getByText(/casa nº 4/i);

    screen.getByText(/contactos/i);
    screen.getByText('Tel: (+244) 998 765 765');
    screen.getByText('Tel: (+244) 998 765 766');
    screen.getByText(/e-mail: exemplo@gmail.com/i);
  });
});
