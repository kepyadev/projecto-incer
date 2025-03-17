import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ROUTES from '../../../../constants/routes';
import { User } from '../../../../constants/user';
import { AuthProvider } from '../../../../context/auth';
import useAuth from '../../../../hooks/use-auth';
import DrawerLeft from './index';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    location: { pathname: '/' },
    push: mockHistoryPush,
  }),
}));

jest.mock('../../../../hooks/use-auth');

describe.skip('DRAWER LEFT', () => {
  const makeSut = () =>
    render(
      <AuthProvider>
        <DrawerLeft open />
      </AuthProvider>
    );

  it('Should render as expected for producer', () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
      [User.Role]: 'producer',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
    });

    makeSut();
    // screen.getByAltText(/logotipo/i);
    screen.getByText(/Dashboard/);
    screen.getByText(/area de produção/i);
    screen.getByText(/cooperativa/i);
  });

  it('Should redirect whe user click on button', async () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
      [User.Role]: 'producer',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
      loading: false,
    });

    makeSut();
    screen.getByAltText(/logotipo/i);
    const buttonDashboard = screen.getByText(/Dashboard/);
    const buttonAreaProducao = screen.getByText(/area de produção/i);
    const buttonAnalisePreco = screen.getByText(/cooperativa/i);

    userEvent.click(buttonDashboard);

    await waitFor(async () => {
      expect(mockHistoryPush).toBeCalledWith(ROUTES.DASHBOARD);
    });

    userEvent.click(buttonAreaProducao);

    await waitFor(async () => {
      expect(mockHistoryPush).toBeCalledWith(ROUTES.PRODUCER_FAZENDA);
    });

    userEvent.click(buttonAnalisePreco);

    await waitFor(async () => {
      expect(mockHistoryPush).toBeCalledWith(ROUTES.PRODUCER_COOPERATIVE);
    });
  });
});
