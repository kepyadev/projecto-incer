import { render, screen } from '@testing-library/react';
import React from 'react';

import { AuthProvider } from '../../../context/auth';
import LoginScreen from './login';

jest.mock('react-router-dom');

const mockHistoryPush = jest.fn();

jest.mock('../../../services/auth/index');
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('LOGIN SCREEN', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // eslint-disable-next-line react/react-in-jsx-scope
  const makeSut = () =>
    render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );
  it('Should render as expected', () => {
    makeSut();
    screen.getByAltText(/logotipo/i);
    screen.getByText(/login/i);
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    screen.getByText(/lembre-me/i);
    screen.getByText(/Esqueceu-se da palavra passe/i);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
