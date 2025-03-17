import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { fakeLocalStorage } from '../../../../../../../../../__mocks__/utils';
import LocationForm from './index';

describe('LOCATION FORM', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  const makeSut = (onNext?: () => void) => render(<LocationForm onNext={onNext} />);

  it('Should render as expected', async () => {
    await act(async () => {
      makeSut();
    });
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
    expect(screen.getAllByRole('spinbutton')).toHaveLength(1);
    screen.getByRole('button', { name: /próximo/i });
  });

  it('Should show validation message for invalid values and should not set localStorage value and not call onNext', async () => {
    const onNext = jest.fn();

    await act(async () => {
      makeSut(onNext);
    });

    expect(
      screen.queryByText(/Por favor indique a estrada nacional mais próxima/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor indique a distância da estrada nacional/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/A Latitude é obrigatória/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/A Longitude é obrigatória/i)).not.toBeInTheDocument();

    const next = screen.getByRole('button', { name: /próximo/i });

    userEvent.click(next);

    await waitFor(async () => {
      screen.getByText(/Por favor indique a estrada nacional mais próxima/i);
      screen.getByText(/Por favor indique a distância da estrada nacional/i);
      screen.getByText(/A Latitude é obrigatória/i);
      screen.getByText(/A Longitude é obrigatória/i);
      expect(onNext).not.toBeCalled();
    });

    const fields = screen.getAllByRole('textbox');
    expect(fields).toHaveLength(3);

    const latitude = fields[1];
    const longitude = fields[2];

    userEvent.type(latitude, 'oeele');
    userEvent.type(longitude, 'fowofowo');

    userEvent.click(next);

    await waitFor(() => {
      screen.getByText(/a latitude deve ser um número/i);
      screen.getByText(/a longitude deve ser um número/i);
    });

    await waitFor(() => {
      expect(window.localStorage.getItem('lacalization')).toStrictEqual(null);
      expect(onNext).not.toBeCalled();
    });
  });

  it('Should not show validation message for valid values and should set values on localStorage and call Next', async () => {
    const onNext = jest.fn();

    act(() => {
      makeSut(onNext);
    });

    expect(
      screen.queryByText(/Por favor indique a estrada nacional mais próxima/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor indique a distância da estrada nacional/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/A Latitude é obrigatória/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/A Longitude é obrigatória/i)).not.toBeInTheDocument();

    const next = screen.getByRole('button', { name: /próximo/i });

    const fields = screen.getAllByRole('textbox');
    expect(fields).toHaveLength(3);
    expect(screen.getAllByRole('button')).toHaveLength(3);

    const estrada = fields[0];
    const distanciaEstrada = screen.getByRole('spinbutton');
    const latitude = fields[1];
    const longitude = fields[2];

    userEvent.type(estrada, 'nacional 100');
    userEvent.type(distanciaEstrada, '3983');
    userEvent.type(latitude, '39388');
    userEvent.type(longitude, '-73983');

    userEvent.click(next);

    await waitFor(() => {
      expect(
        screen.queryByText(/Por favor indique a estrada nacional mais próxima/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Por favor indique a distância da estrada nacional/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/A Latitude é obrigatória/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/A Longitude é obrigatória/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/a latitude deve ser um número/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/a longitude deve ser um número/i)
      ).not.toBeInTheDocument();
    });

    // ADD LOCALIZATION
    await waitFor(() => {
      expect(window.localStorage.getItem('location')).toStrictEqual(
        JSON.stringify({
          localization: {},
          estrada_nacional: 'nacional 100',
          distancia_estrada: '3983',
          geo: { latitude: '39388', longitude: '-73983' },
        })
      );
      expect(onNext).toHaveBeenCalled();
    });
  });
});
