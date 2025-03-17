import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ROUTES from '../../../../constants/routes';
import SiteAppBar from '.';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('APP BAR', () => {
  const makeSut = () => render(<SiteAppBar />);
  it('Should render as expected', () => {
    makeSut();
    screen.getByAltText(/logotipo/i);
    screen.getByRole('button', { name: /login/i });
    screen.getByRole('button', { name: /Criar conta/i });
  });
  it('Should redirect to login', () => {
    makeSut();
    const login = screen.getByRole('button', { name: /login/i });

    userEvent.click(login);
    expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.LOGIN);
  });

  it('Should redirect to signup', () => {
    makeSut();
    const register = screen.getByRole('button', { name: /Criar conta/i });

    userEvent.click(register);
    expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.REGISTER);
  });
});
