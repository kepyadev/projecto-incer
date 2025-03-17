import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { cooperativeMock } from '../../../../../../__mocks__/entiteis';
import { apiListResponse } from '../../../../../../__mocks__/utils';
import { Cooperative, County, Province } from '../../../../../../constants/entities';
import { ContactInformation } from '../../../../../../constants/sub-entites';
import { getAllCooperative } from '../../../../../../services/cooperative';
import CooperativeTechnicianView from '.';

jest.mock('../../../../../../services/cooperative');

describe('TECHNICIAN COOPERATIVE', () => {
  const makeSut = () => render(<CooperativeTechnicianView />);

  it('Should render as expected', async () => {
    (getAllCooperative as jest.Mock).mockResolvedValue(
      apiListResponse([cooperativeMock])
    );
    await act(async () => {
      makeSut();
    });

    screen.getByText(/descrição/i);
    screen.getByText(/telefone/i);
    screen.getByText(/presidente/i);
    screen.getByText(/província/i);
    screen.getByText(/município/i);

    screen.getByText(cooperativeMock[Cooperative.Description]);
    screen.getByText(cooperativeMock[Cooperative.Contact][ContactInformation.Phone]);
    screen.getByText(cooperativeMock[Cooperative.Presindet]);
    screen.getByText(
      cooperativeMock[Cooperative.County][County.Province]![Province.Description]
    );
    screen.getByText(cooperativeMock[Cooperative.County][County.Description]);
  });
});
