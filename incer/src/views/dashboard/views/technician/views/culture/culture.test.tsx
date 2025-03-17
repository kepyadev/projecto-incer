import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { cultureMock } from '../../../../../../__mocks__/entiteis';
import { apiListResponse } from '../../../../../../__mocks__/utils';
import { Culture, CultureType, Fazenda } from '../../../../../../constants/entities';
import { getAllCulture } from '../../../../../../services/culture';
import { formatDate } from '../../../../../../utils';
import CultureTechnicianView from '.';

jest.mock('../../../../../../services/culture');

describe('TECHNICIAN CULTURE', () => {
  const makeSut = () => render(<CultureTechnicianView />);

  it('Should render as expected', async () => {
    (getAllCulture as jest.Mock).mockResolvedValue(apiListResponse([cultureMock]));
    await act(async () => {
      makeSut();
    });

    screen.getByText(/descrição/i);
    screen.getByText(/Fazenda/i);
    screen.getByText(/área/i);
    screen.getByText(/produção/i);
    screen.getByText(/irrigação/i);
    screen.getByText(/sementeira/i);
    screen.getByText(/colheita/i);

    screen.getByText(cultureMock[Culture.Type][CultureType.Description]);
    screen.getByText(cultureMock[Culture.Fazenda]![Fazenda.Descricao]);
    screen.getByText(`${cultureMock[Culture.Ha]} ha`);
    screen.getByText(`${cultureMock[Culture.Producao]} t`);
    screen.getByText(`${cultureMock[Culture.Irrigacao]}`);
    screen.getByText(formatDate(cultureMock[Culture.DataSementeira]));
    screen.getByText(formatDate(cultureMock[Culture.DataColheita]));
  });
});
