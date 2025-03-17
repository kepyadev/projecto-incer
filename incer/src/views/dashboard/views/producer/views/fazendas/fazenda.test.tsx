import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { fazendasMock } from '../../../../../../__mocks__/entiteis';
import { AuthProvider } from '../../../../../../context/auth';
import { getAllFazendaProducer } from '../../../../../../services/fazenda';
import FazendasView from '.';

jest.mock('../../../../../../services/fazenda');
describe('Fazenda view', () => {
  const makeSut = () =>
    render(
      <AuthProvider>
        <FazendasView />
      </AuthProvider>
    );
  it('Should render as expected', async () => {
    const response = {
      status: 200,
      data: {
        msg: '',
        payload: {
          count: 1,
          data: [fazendasMock],
        },
      },
    };

    (getAllFazendaProducer as jest.Mock).mockResolvedValue(response);
    await act(async () => {
      makeSut();
    });
    screen.getByRole('button', { name: /adicionar novo/i });
    screen.getByText(/mostrando 1 de 1/i);
    screen.getByText(/nome/i);
    screen.getByText(/nif/i);
    screen.getByText(/gerente/i);
    screen.getByText(/telefone/i);
    screen.getByText(/e-mail/i);

    screen.getByText(fazendasMock.description);
    screen.getByText(fazendasMock.nif);
    screen.getByText(fazendasMock.gerencia);
    screen.getByText(fazendasMock.contact.phone);
    screen.getByText(fazendasMock.contact.email);
    screen.getByText(/1-1 of 1/i);
  });

  it('Should open create modal when click on adicionar novo', async () => {
    const response = {
      status: 200,
      data: {
        msg: '',
        payload: {
          count: 1,
          data: [fazendasMock],
        },
      },
    };

    (getAllFazendaProducer as jest.Mock).mockResolvedValue(response);
    await act(async () => {
      makeSut();
    });

    const adicionarNovo = screen.getByRole('button', { name: /adicionar novo/i });

    userEvent.click(adicionarNovo);

    await waitFor(async () => {
      screen.getByText(/Cadastrar Fazenda/i);
    });
  });
});
