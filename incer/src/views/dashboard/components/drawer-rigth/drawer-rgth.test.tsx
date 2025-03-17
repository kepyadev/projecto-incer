import { render, screen } from '@testing-library/react';
import React from 'react';

import { User } from '../../../../constants/user';
import { AuthProvider } from '../../../../context/auth';
import useAuth from '../../../../hooks/use-auth';
import DrawerRigth from '.';

jest.mock('../../../../hooks/use-auth');

describe.skip('LOGGED USER', () => {
  const makeSut = () =>
    render(
      <AuthProvider>
        <DrawerRigth open>options</DrawerRigth>
      </AuthProvider>
    );
  it('Should render as expected', () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
    });
    makeSut();

    screen.getByText(/ola! zebedeu joaquim/i);
    screen.getByAltText('user');
    screen.getByText(/options/i);
  });
});
