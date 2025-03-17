import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { cooperativeMock } from '../../../../../../__mocks__/entiteis';
import { User } from '../../../../../../constants/user';
import { AuthProvider } from '../../../../../../context/auth';
import * as asyncObj from '../../../../../../hooks/use-async-state';
import useAuth from '../../../../../../hooks/use-auth';
import { getMyCooperative } from '../../../../../../services/producer';
import { HttpResponse } from '../../../../../../services/services.types';
import { ICooperative } from '../../../../../../types/cooperative';
import { MsgData } from '../../../../../../types/services';
import CooperativaProducerView from '.';

const makeResponse = (
  cooperative: ICooperative | null
): HttpResponse<MsgData<ICooperative>> | null => {
  if (!cooperative) return null;
  return {
    status: 200,
    data: {
      msg: 'Cooperativa encontrada',
      payload: cooperative,
    },
  };
};

const responseMock: HttpResponse<MsgData<ICooperative | undefined>> = {
  status: 200,
  data: {
    msg: 'Cooperativa encontrada',
    payload: cooperativeMock,
  },
};

jest.mock('../../../../../../services/cooperative');
jest.mock('../../../../../../services/producer');
jest.mock('../../../../../../hooks/use-auth');
describe('Cooperative Producer View', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const makeSut = () =>
    render(
      <AuthProvider>
        <CooperativaProducerView />
      </AuthProvider>
    );

  it('Should render as expected', async () => {
    (getMyCooperative as jest.Mock).mockResolvedValue(responseMock);
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
      [User.Role]: 'producer',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
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

    screen.getByText(/cooperativa - chissola/i);
    screen.getByText(/provincia/i);
    screen.getByText(cooperativeMock.county.province!.description);
    screen.getByText(/municipio/i);
    screen.getByText(cooperativeMock.county.description);
    screen.getByText(/presidente/i);
    screen.getByText(cooperativeMock.president);
    screen.getByText(/contacto/i);
    screen.getByText(cooperativeMock.contact.phone);
  });

  it('Should show msg for producer whitout cooperative', async () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
      [User.Role]: 'producer',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
      loading: false,
    });
    (getMyCooperative as jest.Mock).mockResolvedValue(makeResponse(null));
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
    await act(() => {
      makeSut();
    });
    screen.getByText(
      /caro produtor, actualmente não está vinculado a nenhuma cooperativa/i
    );
  });

  it('Should show progressbar on loading data', async () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
      [User.Role]: 'producer',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
      loading: false,
    });
    (getMyCooperative as jest.Mock).mockResolvedValue(makeResponse(null));
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

  it('Should show error component when some error happen', async () => {
    const user = {
      [User.Name]: 'Zebedeu Joaquim',
      [User.Role]: 'producer',
    };
    (useAuth as jest.Mock).mockReturnValue({
      user,
      loading: false,
    });
    (getMyCooperative as jest.Mock).mockRejectedValue(
      Error('Lamentamos, ocorreu uma falha')
    );
    jest.spyOn(asyncObj, 'default').mockReturnValue({
      error: Error('Lamentamos, ocorreu uma falha'),
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
    screen.getByText(/Lamentamos, ocorreu uma falha/i);
  });
});
