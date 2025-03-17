import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { fazendasMock } from '../../../../../../../__mocks__/entiteis';
import { fakeLocalStorage } from '../../../../../../../__mocks__/utils';
import { AuthProvider } from '../../../../../../../context/auth';
import * as asyncObj from '../../../../../../../hooks/use-async-state';
import { getFazendaById } from '../../../../../../../services/fazenda';
import UpdateFazendaForm from '.';

const modalHandleCloseMock = jest.fn();
jest.mock('../../../../../../../services/fazenda');
describe('UPDATE FAZENDA FORM STEPPER', () => {
  const makeSut = () =>
    render(
      <AuthProvider>
        <UpdateFazendaForm modalHandleClose={modalHandleCloseMock} />
      </AuthProvider>
    );

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should render as expected', async () => {
    localStorage.setItem('active_item', '425242');
    (getFazendaById as jest.Mock).mockResolvedValue({
      status: 200,
      data: {
        msg: 'Fazenda encontrada',
        payload: fazendasMock,
      },
    });
    jest.spyOn(asyncObj, 'default').mockReturnValue({
      error: null,
      data: null,
      loading: false,
      success: false,
      snackMessage: null,
      setData: jest.fn(),
      setError: jest.fn(),
      setLoading: jest.fn(),
      setSuccess: jest.fn(),
      setSnackMessage: jest.fn(),
    });
    await act(async () => {
      makeSut();
    });

    screen.getByText(/identificação/i);
    screen.getByText(/localização/i);
    screen.getByText(/solo/i);
  });

  it('Should show error component when some error happen', async () => {
    (getFazendaById as jest.Mock).mockRejectedValue(
      Error('Lamentamos, ocorreu uma falha.')
    );
    jest.spyOn(asyncObj, 'default').mockReturnValue({
      error: Error('Lamentamos, ocorreu uma falha.'),
      data: null,
      loading: false,
      success: false,
      snackMessage: null,
      setData: jest.fn(),
      setError: jest.fn(),
      setLoading: jest.fn(),
      setSuccess: jest.fn(),
      setSnackMessage: jest.fn(),
    });
    await act(() => {
      makeSut();
    });
    screen.getByText(/Lamentamos, ocorreu uma falha./i);
  });

  it('Should show progressbar on loading data', async () => {
    (getFazendaById as jest.Mock).mockResolvedValue({});
    jest.spyOn(asyncObj, 'default').mockReturnValue({
      error: null,
      data: null,
      loading: true,
      success: false,
      snackMessage: null,
      setData: jest.fn(),
      setError: jest.fn(),
      setLoading: jest.fn(),
      setSuccess: jest.fn(),
      setSnackMessage: jest.fn(),
    });

    await act(() => {
      makeSut();
    });
    screen.getByRole('progressbar');
  });
});
