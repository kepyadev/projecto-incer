import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { fazendasMockList } from '../../../../../../__mocks__/entiteis';
import { apiListResponse } from '../../../../../../__mocks__/utils';
import { Fazenda, Producer } from '../../../../../../constants/entities';
import { User } from '../../../../../../constants/user';
import { getAllFazenda } from '../../../../../../services/fazenda';
import FazendaTechnicianView from '.';

jest.mock('../../../../../../services/fazenda');

describe('TECHNICIAN FAZENDA', () => {
  const makeSut = () => render(<FazendaTechnicianView />);

  it('Should render as expected', async () => {
    (getAllFazenda as jest.Mock).mockResolvedValue(
      apiListResponse(fazendasMockList)
    );
    await act(async () => {
      makeSut();
    });

    screen.getByText(/fazenda/i);
    screen.getByText(/Extensão/i);
    screen.getByText(/produtor/i);

    screen.getByText(/adicionar novo/i);
    screen.getByText(fazendasMockList[0][Fazenda.Descricao]);
    screen.getByText(`${fazendasMockList[0][Fazenda.Extension]} ha`);
    screen.getByText(
      `${fazendasMockList[0][Fazenda.Producer][Producer.User][User.Name]}`
    );
  });
});
