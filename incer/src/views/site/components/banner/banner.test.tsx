import { render, screen } from '@testing-library/react';
import React from 'react';

import SiteBanner from '.';

describe('SITE BANNER', () => {
  const makeSut = () => render(<SiteBanner />);
  it('Should render as expected', () => {
    makeSut();
    screen.getByRole('heading', {
      name: /colecta e análise de dados dos operadores de cereais/i,
    });
    screen.getByRole('button', { name: /ver dados/i });
  });
});
