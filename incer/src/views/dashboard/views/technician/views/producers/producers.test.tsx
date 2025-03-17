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
    await act(() => {
      makeSut();
    });

    screen.getByText(/Nome/i);
    screen.getByText(/telefone/i);
    screen.getByText(/e-mail/i);

    screen.getByText(/adicionar novo/i);
    screen.getByText(
      `${fazendasMockList[0][Fazenda.Producer][Producer.User][User.Name]}`
    );
    screen.getByText(
      `${fazendasMockList[0][Fazenda.Producer][Producer.User][User.Phone]}`
    );
    screen.getByText(
      `${fazendasMockList[0][Fazenda.Producer][Producer.User][User.Email]}`
    );
  });
});
