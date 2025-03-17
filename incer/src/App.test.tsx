import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

describe('APP', () => {
  const makeSut = () => render(<App />);
  it('Should Render Childrens', () => {
    makeSut();
    const logotipos = screen.getAllByAltText(/logotipo/i);
    screen.getByRole('button', { name: /login/i });
    screen.getByRole('button', { name: /Criar conta/i });

    screen.getByText(/colecta e análise de dados dos operadores de cereais/i);
    screen.getByText(/ver dados/i);

    screen.getByText(/endereço/i);
    screen.getByText(/Luanda, talatona/i);
    screen.getByText(/Município Talatona Via AS21/i);
    screen.getByText(/casa nº 4/i);

    screen.getByText(/contactos/i);
    screen.getByText('Tel: (+244) 998 765 765');
    screen.getByText('Tel: (+244) 998 765 766');
    screen.getByText(/E-mail: exemplo@gmail.com/i);

    expect(logotipos).toHaveLength(2);
  });
});
