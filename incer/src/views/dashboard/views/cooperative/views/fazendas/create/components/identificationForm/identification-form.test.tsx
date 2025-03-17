import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {
  fazendasMockList,
  userMock,
} from '../../../../../../../../../__mocks__/entiteis';
import { fakeLocalStorage } from '../../../../../../../../../__mocks__/utils';
import { Fazenda, Producer } from '../../../../../../../../../constants/entities';
import { User } from '../../../../../../../../../constants/user';
import { AuthProvider } from '../../../../../../../../../context/auth';
import useAuth from '../../../../../../../../../hooks/use-auth';
import IdentificationForm from './index';

jest.mock('../../../../../../../../../hooks/use-auth');

describe('IDENTIFICATION FORM', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  const makeSut = (onNext?: () => void) =>
    render(
      <AuthProvider>
        <IdentificationForm
          onNext={onNext}
          producerIn={{
            [Producer.Bi]: '482474',
            [Producer.Id]: '387',
            [Producer.Fazendas]: fazendasMockList,
            [Producer.Nif]: '7499',
            [Producer.User]: userMock,
          }}
        />
      </AuthProvider>
    );
  it('Should render as expected', () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
      [User.Role]: 'producer',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
      laoding: false,
    });
    makeSut();
    expect(screen.getAllByRole('textbox')).toHaveLength(5);
    screen.getByRole('button', { name: /sair/i });
    screen.getByRole('button', { name: /próximo/i });
  });

  it('Should show validation message for invalid values and should not set localStorage value and not call onNext', async () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
      [User.Role]: 'producer',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
      laoding: false,
    });
    const onNext = jest.fn();
    makeSut(onNext);
    expect(screen.queryByText(/A descrição é obrigatória/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/O Nif é obrigatório/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /Por favor insira um número Telefónico válido, Ex. 900111222/i
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor indique o gerente/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/O E-mail é obrigatório/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor insira um e-mail válido/i)
    ).not.toBeInTheDocument();

    const next = screen.getByRole('button', { name: /próximo/i });

    userEvent.click(next);

    await waitFor(async () => {
      expect(screen.queryByText(/A descrição é obrigatória/i)).toBeInTheDocument();
      expect(screen.queryByText(/O Nif é obrigatório/i)).toBeInTheDocument();
      expect(
        screen.queryByText(
          /Por favor insira um número Telefónico válido, Ex. 900111222/i
        )
      ).toBeInTheDocument();
      expect(screen.queryByText(/Por favor indique o gerente/i)).toBeInTheDocument();
      expect(screen.queryByText(/O E-mail é obrigatório/i)).toBeInTheDocument();
      expect(screen.queryByText(/O E-mail é obrigatório/i)).toBeInTheDocument();
    });

    const fields = screen.getAllByRole('textbox');
    const email = fields[4];
    userEvent.type(email, 'micc');

    await waitFor(async () => {
      expect(screen.queryByText(/A descrição é obrigatória/i)).toBeInTheDocument();
      expect(screen.queryByText(/O Nif é obrigatório/i)).toBeInTheDocument();
      expect(
        screen.queryByText(
          /Por favor insira um número Telefónico válido, Ex. 900111222/i
        )
      ).toBeInTheDocument();
      expect(screen.queryByText(/Por favor indique o gerente/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/Por favor insira um e-mail válido/i)
      ).toBeInTheDocument();
      expect(screen.queryByText(/O E-mail é obrigatório/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(window.localStorage.getItem('fazenda')).toStrictEqual(null);
      expect(onNext).not.toBeCalled();
    });
  });

  it('Should not show validation message for valid values and should set values on localStorage and call Next', async () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
      [User.Role]: 'producer',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
    });
    localStorage.setItem('auth', JSON.stringify({ producer: {} }));

    const onNext = jest.fn();
    makeSut(onNext);
    expect(screen.queryByText(/A descrição é obrigatória/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/O Nif é obrigatório/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /Por favor insira um número Telefónico válido, Ex. 900111222/i
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor indique o gerente/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/O E-mail é obrigatório/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor insira um e-mail válido/i)
    ).not.toBeInTheDocument();

    const fields = screen.getAllByRole('textbox');
    const name = fields[0];
    const nif = fields[1];
    const gerente = fields[2];
    const phone = fields[3];
    const email = fields[4];
    const next = screen.getByRole('button', { name: /próximo/i });

    userEvent.type(name, 'Chissola');
    userEvent.type(nif, '17262782LA00');
    userEvent.type(gerente, 'Zebedeu');
    userEvent.type(phone, '900666555');
    userEvent.type(email, 'zebedeu@glaminin.com');
    userEvent.click(next);

    await waitFor(async () => {
      expect(
        screen.queryByText(/A descrição é obrigatória/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/O Nif é obrigatório/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          /Por favor insira um número Telefónico válido, Ex. 900111222/i
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Por favor indique o gerente/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/O E-mail é obrigatório/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Por favor insira um e-mail válido/i)
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(window.localStorage.getItem('fazenda')).toStrictEqual(
        JSON.stringify({
          description: 'Chissola',
          nif: '17262782LA00',
          gerencia: 'Zebedeu',
          contact: { phone: '900666555', email: 'zebedeu@glaminin.com' },
          [Fazenda.Producer]: '387',
        })
      );
      expect(onNext).toBeCalled();
    });
  });
});
