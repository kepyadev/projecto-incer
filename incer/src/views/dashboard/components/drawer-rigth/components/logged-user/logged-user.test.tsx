import { render, screen } from '@testing-library/react';
import React from 'react';

import { User } from '../../../../../../constants/user';
import { AuthProvider } from '../../../../../../context/auth';
import useAuth from '../../../../../../hooks/use-auth';
import LoggedUser from '.';

jest.mock('../../../../../../hooks/use-auth');

describe('LOGGED USER COMPONENT', () => {
  const makeSut = () =>
    render(
      <AuthProvider>
        <LoggedUser />
      </AuthProvider>
    );
  it('Should render as s expected', () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
    });
    makeSut();

    screen.getByText(/ola! zebedeu joaquim/i);
    screen.getByAltText('user');
  });
});
