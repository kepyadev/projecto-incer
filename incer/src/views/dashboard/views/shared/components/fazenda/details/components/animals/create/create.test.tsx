import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { animalTypeMockList } from '../../../../../../../../../../__mocks__/entiteis';
import { AnimalType } from '../../../../../../../../../../constants/sub-entites';
import { getAllAnimalsTypes } from '../../../../../../../../../../services/animals-type';
import CreateAnimal from './index';

jest.mock('../../../../../../../../../../services/animals');

describe('ADD ANIMALS INTO FAZENDA', () => {
  const makeSut = () => render(<CreateAnimal fazendaId="1110" />);

  it('render as expected', async () => {
    (getAllAnimalsTypes as jest.Mock).mockResolvedValue({
      status: 200,
      data: {
        payload: {
          count: 2,
          data: animalTypeMockList,
        },
      },
    });
    await act(async () => {
      makeSut();
    });
    const tipo = screen.getByRole('button', { name: /tipo/i });
    screen.getByRole('button', { name: /salvar/i });
    expect(screen.getAllByRole('spinbutton')).toHaveLength(4);

    await act(async () => {
      userEvent.click(tipo);
    });

    await waitFor(() => {
      screen.getByText(animalTypeMockList[0][AnimalType.Description]);
    });

    await act(async () => {
      userEvent.click(
        screen.getByText(animalTypeMockList[0][AnimalType.Description])
      );
    });

    await waitFor(() => {
      screen.getAllByText(/quantidade de ovos/i);
    });
  });
});
