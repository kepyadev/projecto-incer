import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { HTTP } from '../../../../constants';
import ROUTES from '../../../../constants/routes';
import { AuthProvider } from '../../../../context/auth';
import { authLogin } from '../../../../services/auth/index';
import LoginForm from '.';

const mockHistoryPush = jest.fn();

jest.mock('../../../../services/auth/index');
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('LOGIN', () => {
  // const user = { name: 'Zebedeu' };
  // const value = {
  //   handleLogin: jest.fn(),
  //   authenticated: Boolean(user),
  //   user,
  //   handleLogout: jest.fn(),
  // };
  const makeSut = () =>
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

  it('Should render as expected', () => {
    makeSut();
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    screen.getByText(/lembre-me/i);
    screen.getByText(/entrar/i);
    screen.getByText(/registrar-se/i);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(
      screen.getByText('Esqueceu-se da palavra passe').closest('a')
    ).toHaveAttribute('href', '/forget-password');
  });

  it('Should show validation msg for empty email', async () => {
    makeSut();
    const fields = screen.getAllByRole('textbox');
    const emailField = fields[0];
    const passwordField = fields[1];
    const buttons = screen.getAllByRole('button');
    const loginButton = buttons[0];

    userEvent.type(emailField, '');
    userEvent.type(passwordField, '1234');
    userEvent.click(loginButton);

    await waitFor(async () => {
      screen.getByText(/O e-mail é obrigatorio/i);
    });
  });
  it('Should show validation msg for wrong email format', async () => {
    makeSut();
    const fields = screen.getAllByRole('textbox');
    const emailField = fields[0];
    const passwordField = fields[1];
    const buttons = screen.getAllByRole('button');
    const loginButton = buttons[0];

    userEvent.type(emailField, 'mic.com');
    userEvent.type(passwordField, '1234');
    userEvent.click(loginButton);

    await waitFor(async () => {
      screen.getByText(/Por favor, digite um e-mail válido!/i);
    });
  });

  it('Should show validation msg for empty password', async () => {
    makeSut();
    const fields = screen.getAllByRole('textbox');
    const emailField = fields[0];
    const passwordField = fields[1];
    const buttons = screen.getAllByRole('button');
    const loginButton = buttons[0];

    userEvent.type(emailField, 'mic@laminin.com');
    userEvent.type(passwordField, '');
    userEvent.click(loginButton);

    await waitFor(async () => {
      screen.getByText(/A palavra passe é obrigatoria/i);
    });
  });

  it('Should show validation msg for password with length less than 4', async () => {
    makeSut();
    const fields = screen.getAllByRole('textbox');
    const emailField = fields[0];
    const passwordField = fields[1];
    const buttons = screen.getAllByRole('button');
    const loginButton = buttons[0];

    userEvent.type(emailField, 'mic@laminin.com');
    userEvent.type(passwordField, '123');
    userEvent.click(loginButton);

    await waitFor(async () => {
      screen.getByText(/A sua palavra passe deve ter um minimo de 4 caracteres/i);
    });
  });

  it('should not show validation msg for valid values', async () => {
    (authLogin as jest.Mock).mockResolvedValue({});
    makeSut();

    const fields = screen.getAllByRole('textbox');
    const emailField = fields[0];
    const passwordField = fields[1];
    const buttons = screen.getAllByRole('button');
    const loginButton = buttons[0];

    userEvent.type(emailField, 'mic@laminin.com');
    userEvent.type(passwordField, '12345');
    userEvent.click(loginButton);

    await waitFor(async () => {
      expect(
        screen.queryByText(/Por favor, digite um e-mail válido!/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/A palavra passe é obrigatoria/i)
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText(
          /A sua palavra passe deve ter um minimo de 4 caracteres!/i
        )
      ).not.toBeInTheDocument();
    });
  });

  it('Should redirect for dashboard when crendetial are accepted', async () => {
    (authLogin as jest.Mock).mockResolvedValue({
      status: 200,
      body: { msg: 'Sucesso, credenciais aceites' },
    });
    const credentials = { email: 'mic@laminin.com', password: '12334' };
    makeSut();

    const fields = screen.getAllByRole('textbox');
    const emailField = fields[0];
    const passwordField = fields[1];
    const buttons = screen.getAllByRole('button');
    const loginButton = buttons[0];

    userEvent.type(emailField, credentials.email);
    userEvent.type(passwordField, credentials.password);
    userEvent.click(loginButton);

    await waitFor(() => {
      expect(authLogin).toBeCalledWith(credentials);
    });
  });

  it('Should redirect to register route when click on button Register', async () => {
    makeSut();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    userEvent.click(buttons[1]);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.REGISTER);
    });
  });

  it('Should show error msg for wrong credentials', async () => {
    (authLogin as jest.Mock).mockRejectedValue({
      status: HTTP.UNAUTHORIZED,
      message: 'Lamentamos, e-mail ou palavra passe errada!',
    });
    makeSut();
    const credentials = { email: 'mic@laminin.com', password: '12334' };

    const fields = screen.getAllByRole('textbox');
    const emailField = fields[0];
    const passwordField = fields[1];
    const buttons = screen.getAllByRole('button');
    const loginButton = buttons[0];

    userEvent.type(emailField, credentials.email);
    userEvent.type(passwordField, credentials.password);
    userEvent.click(loginButton);

    await waitFor(async () => {
      screen.getByText(/Lamentamos, e-mail ou palavra passe errada!/i);
      expect(authLogin).toBeCalledWith(credentials);
    });
  });
});
