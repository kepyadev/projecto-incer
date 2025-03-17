import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { AuthProvider } from '../../../../../../../context/auth';
import CreateFazendaForm from '.';

const modalHandleCloseMock = jest.fn();
describe('CREATE FAZENDA FORM STEPPER', () => {
  const makeSut = () =>
    render(
      <AuthProvider>
        <CreateFazendaForm modalHandleClose={modalHandleCloseMock} />
      </AuthProvider>
    );

  it('Should render as expected', async () => {
    await act(async () => {
      makeSut();
    });

    screen.getByText(/identificação/i);
    screen.getByText(/localização/i);
    screen.getByText(/solo/i);
  });
});
