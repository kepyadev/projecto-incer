import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { User } from '../../../../constants/user';
import { AuthProvider } from '../../../../context/auth';
import { authSignUp } from '../../../../services/auth';
import { UserRole } from '../../../../types/user';
import SignupForm from '.';

jest.mock('../../../../services/auth');

describe('SIGNUP FORM', () => {
  const makeSut = () =>
    render(
      <AuthProvider>
        <SignupForm />
      </AuthProvider>
    );
  it('Should render as expected', () => {
    makeSut();
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
    screen.getByText(/Tipo de conta/);
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    screen.getByText(
      /Ao se cadastrar estara a concordar com os termos e condições/i
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('Should show validation message for required fields', async () => {
    makeSut();
    const submit = screen.getByText(/registrar-se/i);
    userEvent.click(submit);
    await waitFor(() => {
      screen.getByText(/o nome é obrigatório/i);
      screen.getByText(/o número de telefone é obrigatório/i);
      screen.getByText(/a palavra passe é obrigatória/i);
    });
  });

  it('Should show validation msg for invalid e-mail', async () => {
    makeSut();
    const fields = screen.getAllByRole('textbox');
    const name = fields[0];
    const email = fields[2];

    userEvent.type(name, 'Zebedeu');
    userEvent.type(email, 'micheljoaquim');

    const submit = screen.getByText(/registrar-se/i);
    userEvent.click(submit);

    await waitFor(() => {
      screen.getByText(/por favor, digite um e-mail válido!/i);
    });
  });

  it('Should show validation msg when confirm password dont match with password', async () => {
    makeSut();
    const fields = screen.getAllByRole('textbox');
    const name = fields[0];
    const email = fields[1];
    const phone = fields[2];
    const password = fields[3];
    const confirmPassword = fields[4];

    userEvent.type(name, 'Zebedeu');
    userEvent.type(email, 'zebedeu@incer.ao');
    userEvent.type(phone, '900111333');
    userEvent.type(password, '1234');
    userEvent.type(confirmPassword, '12345');

    const submit = screen.getByText(/registrar-se/i);
    userEvent.click(submit);

    await waitFor(() => {
      screen.getByText(/a palavra passe de confirmação não confere/i);
    });
  });

  it('Should show error when user dont check terms and conditions', async () => {
    makeSut();
    const fields = screen.getAllByRole('textbox');
    const name = fields[0];
    const email = fields[2];
    const phone = fields[3];
    const password = fields[4];
    const confirmPassword = fields[5];

    expect(fields).toHaveLength(6);

    userEvent.type(name, 'Zebedeu');
    userEvent.type(email, 'zebedeu@incer.ao');
    userEvent.type(phone, '900111333');
    userEvent.type(password, '1234');
    userEvent.type(confirmPassword, '1234');

    const submit = screen.getAllByRole('button')[1];
    userEvent.click(submit);

    await waitFor(async () => {
      expect(screen.queryByText(/o nome é obrigatório/i)).not.toBeInTheDocument();
    });
    await waitFor(async () => {
      expect(
        screen.queryByText(/o número de telefone é obrigatório/i)
      ).not.toBeInTheDocument();
    });
    await waitFor(async () => {
      expect(
        screen.queryByText(/a palavra passe é obrigatória/i)
      ).not.toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(
        screen.queryByText(/a palavra passe de confirmação não confere/i)
      ).not.toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(
        screen.queryByText(/por favor, digite um e-mail válido!/i)
      ).not.toBeInTheDocument();
    });

    await waitFor(async () => {
      screen.getByText(
        /Para terminar o seu cadastro deve aceitar os termos e condições./i
      );
    });
  });

  it('Should send request with right params', async () => {
    (authSignUp as jest.Mock).mockResolvedValue({
      status: 200,
      body: { msg: 'Sucesso, credenciais aceites' },
    });
    makeSut();
    const fields = screen.getAllByRole('textbox');
    const name = fields[0];
    const email = fields[2];
    const phone = fields[3];
    const password = fields[4];
    const confirmPassword = fields[5];

    const user = {
      [User.FirstName]: 'Zebedeu',
      [User.Email]: 'zebedeu@incer.ao',
      [User.Phone]: '900222333',
      [User.Password]: '1234',
      [User.ConfirmPassword]: '1234',
    };

    userEvent.type(name, user[User.FirstName]);
    userEvent.type(email, user[User.Email]);
    userEvent.type(phone, `${user[User.Phone]}`);
    userEvent.type(password, user[User.Password]);
    userEvent.type(confirmPassword, user[User.ConfirmPassword]);

    const check = screen.getByRole('checkbox');
    userEvent.click(check);

    const submit = screen.getByText(/registrar-se/i);
    userEvent.click(submit);

    await waitFor(() => {
      expect(screen.queryByText(/o nome é obrigatório/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/o número de telefone é obrigatório/i)
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/a palavra passe é obrigatória/i)
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/por favor, digite um e-mail válido!/i)
      ).not.toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(authSignUp).toBeCalledWith({
        [User.FirstName]: 'Zebedeu',
        [User.LastName]: '',
        [User.Email]: 'zebedeu@incer.ao',
        [User.Password]: '1234',
        [User.Role]: UserRole.Producer,
        [User.Phone]: '900222333',
      });
    });
  });
});
