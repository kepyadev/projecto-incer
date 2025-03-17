import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { fakeLocalStorage } from '../../../../../../../../../__mocks__/utils';
import { Fazenda } from '../../../../../../../../../constants/entities';
import {
  ContactInformation,
  Geo,
} from '../../../../../../../../../constants/sub-entites';
import { createFazenda } from '../../../../../../../../../services/fazenda';
import Confirmation from '.';

jest.mock('../../../../../../../../../services/fazenda/index');

describe('FAZENDA CREATE CONFIMARTION ', () => {
  const onReset = jest.fn();
  const onClose = jest.fn();
  const setSnack = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const localizationMock = {
    [Fazenda.Geo]: {
      [Geo.Latitude]: 4294779297429,
      [Geo.Longitude]: 9837373773,
    },
    localization: {
      comuna: { _id: '24242', description: 'tala hady' },
      county: { _id: '24242442', description: 'cazenga' },
      province: { _id: '92480284', description: 'luanda' },
    },
    estrada_nacional: 'nacional 100',
    distancia_estrada: '3983',
  };

  const setRigthDataOnLocalStorage = () => {
    localStorage.setItem(
      'fazenda',
      JSON.stringify({
        [Fazenda.Descricao]: 'Chissola',
        [Fazenda.Nif]: '17262782LA00',
        [Fazenda.Gerencia]: 'Zebedeu',
        [Fazenda.Contact]: { phone: '900666555', email: 'mjorge@glaminin.com' },
      })
    );

    localStorage.setItem('location', JSON.stringify(localizationMock));

    localStorage.setItem(
      'ground',
      JSON.stringify({
        area_corrigida: '387',
        ph_medio: 609,
        propriedades_fisicas: '6464',
        orografia: '13333',
        altitude_media: '139339',
        extension: 424244,
      })
    );
  };

  const makeSut = () => {
    render(
      <Confirmation onReset={onReset} onClose={onClose} setSnackMessage={setSnack} />
    );
  };

  it('Should show error msg if is missing information on localstorage', () => {
    makeSut();

    screen.getByText(
      /Lamentamos, não foram fornecidas informações suficientes para completar este processo/i
    );

    screen.getByRole('button', { name: /tentar novamente/i });
  });

  it('Should render as expected', () => {
    setRigthDataOnLocalStorage();
    makeSut();
    screen.getByText(/identificação/i);
    screen.getByText(/descrição/i);
    screen.getByText(/chissola/i);
    screen.getByText(/nif/i);
    screen.getByText(/17262782LA00/i);
    screen.getByText(/Gerencia/i);
    screen.getByText(/Zebedeu/i);
    screen.getByText(/Telefone/i);
    screen.getByText(/900666555/i);
    screen.getByText(/E-mail/i);
    screen.getByText(/mjorge@glaminin.com/i);

    screen.getByText(/localização/i);
    screen.getByText(/provincia/i);
    screen.getByText(/luanda/i);
    screen.getByText(/municipio/i);
    screen.getByText(/cazenga/i);
    screen.getByText(/estrada nacional mais próxima/i);
    screen.getByText(/nacional 100/i);
    screen.getByText(/distancia da estrada nacional/i);
    screen.getByText(/3983 Km/i);

    screen.getByText(/Solo/i);
    screen.getByText(/altitude média/i);
    screen.getByText(/139339/i);
    screen.getByText(/orografia/i);
    screen.getByText(/13333/i);
    screen.getByText(/propriedades físicas/i);
    screen.getByText(/6464/i);
    screen.getByText(/ph médio/i);
    screen.getByText(/609/i);
    screen.getByText(/area corrigida/i);
    screen.getByText(/387/i);

    screen.getByRole('button', { name: /salvar/i });
  });

  it('Should make service call, clear localstorage and call onClose', async () => {
    setRigthDataOnLocalStorage();
    (createFazenda as jest.Mock).mockResolvedValue({
      status: 200,
      data: {
        payload: {
          [Fazenda.Id]: 'f08f0q80',
          [Fazenda.Descricao]: 'Chissola',
          [Fazenda.Contact]: {
            [ContactInformation.Phone]: 900222333,
            [ContactInformation.Email]: 'zebedeu@fakfa.com',
          },
          [Fazenda.Estradanacional]: 'Nacional',
          [Fazenda.DistanciaEstrada]: 2093,
        },
        msg: 'Sucesso',
      },
    });
    makeSut();

    const save = screen.getByRole('button', { name: /salvar/i });

    await act(async () => {
      userEvent.click(save);
    });

    expect(createFazenda).toHaveBeenCalledWith({
      contact: {
        email: 'mjorge@glaminin.com',
        phone: '900666555',
      },
      description: 'Chissola',
      distancia_estrada: '3983',
      estrada_nacional: 'nacional 100',
      gerencia: 'Zebedeu',
      ground: {
        altitude_media: '139339',
        area_corrigida: '387',
        orografia: '13333',
        ph_medio: 609,
        propriedades_fisicas: '6464',
      },
      geo: {
        latitude: localizationMock.geo.latitude,
        longitude: localizationMock.geo.longitude,
      },
      // eslint-disable-next-line no-underscore-dangle
      county: localizationMock.localization.county._id,
      extension: 424244,
      nif: '17262782LA00',
    });

    expect(setSnack).toBeCalledWith({
      isError: false,
      message: 'Sucesso',
    });

    expect(localStorage.getItem('fazenda')).toStrictEqual(null);
    expect(localStorage.getItem('location')).toStrictEqual(null);
    expect(localStorage.getItem('ground')).toStrictEqual(null);
  });

  it('Should show error message if happen an error on backend', async () => {
    setRigthDataOnLocalStorage();
    (createFazenda as jest.Mock).mockRejectedValue({
      status: 401,
      errorMessage: 'Ocorreu um erro',
      data: {
        payload: {},
        msg: 'Permissão negada',
      },
    });
    makeSut();

    const save = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(save);
    // await act(() => {
    // });

    await waitFor(() => {
      expect(createFazenda).toHaveBeenCalledWith({
        contact: {
          email: 'mjorge@glaminin.com',
          phone: '900666555',
        },
        description: 'Chissola',
        distancia_estrada: '3983',
        estrada_nacional: 'nacional 100',
        gerencia: 'Zebedeu',
        ground: {
          altitude_media: '139339',
          area_corrigida: '387',
          orografia: '13333',
          ph_medio: 609,
          propriedades_fisicas: '6464',
        },
        geo: {
          latitude: localizationMock.geo.latitude,
          longitude: localizationMock.geo.longitude,
        },
        // eslint-disable-next-line no-underscore-dangle
        county: localizationMock.localization.county._id,
        extension: 424244,
        nif: '17262782LA00',
      });
    });

    expect(setSnack).toBeCalledWith({
      isError: true,
      message: 'Ocorreu um erro',
    });
  });
});
