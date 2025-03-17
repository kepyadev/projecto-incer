import { render, screen } from '@testing-library/react';
import React from 'react';

import { AuthProvider } from '../../../context/auth';
import SignupScreen from '.';

describe('SIGNUP', () => {
  const makeSut = () =>
    render(
      <AuthProvider>
        <SignupScreen />
      </AuthProvider>
    );
  it('Should render as expected', () => {
    makeSut();
    screen.getByText(/registo/i);
    expect(screen.getAllByRole('textbox')).toHaveLength(7);
    screen.getByText(/Tipo de conta/);
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    screen.getByText(
      /Ao se cadastrar estara a concordar com os termos e condições/i
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
