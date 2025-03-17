import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { fazendasMock } from '../../../../../../../../../__mocks__/entiteis';
import { fakeLocalStorage } from '../../../../../../../../../__mocks__/utils';
import { IFazenda } from '../../../../../../../../../types/fazenda';
import GroundForm from './index';

describe('GROUND FORM', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  const makeSut = (onNext?: () => void, fazenda?: IFazenda) =>
    render(<GroundForm onNext={onNext} fazenda={fazenda} />);
  it('Should render as expected', () => {
    makeSut();
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getAllByRole('spinbutton')).toHaveLength(2);
    screen.getByRole('button', { name: /próximo/i });
  });

  it('Should show validation message for invalid values and should not set values on localStorage and not call onNext', async () => {
    const onNext = jest.fn();
    makeSut(onNext);
    expect(
      screen.queryByText(/A altitude média é obrigatória/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/A orografia é obrigatória/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/As propriedades físicas são obrigatórias/i)
    ).not.toBeInTheDocument();
    // expect(screen.queryByText(/O PH é obrigatório/i)).not.toBeInTheDocument();
    // expect(
    //   screen.queryByText(/O valor mínimo para o PH médio é 1/i)
    // ).not.toBeInTheDocument();
    // expect(
    //   screen.queryByText(/O valor máximo para o PH médio é 7/i)
    // ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/A area corrigida é obrigatória/i)
    ).not.toBeInTheDocument();

    const next = screen.getByRole('button', { name: /próximo/i });

    userEvent.click(next);

    await waitFor(() => {
      screen.getByText(/A altitude média é obrigatória/i);
    });
    await waitFor(() => {
      screen.getByText(/A orografia é obrigatória/i);
    });
    await waitFor(() => {
      screen.getByText(/As propriedades físicas são obrigatórias/i);
    });
    // await waitFor(() => {
    //   screen.getByText(/O valor mínimo para o PH médio é 1/i);
    // });
    await waitFor(() => {
      screen.getByText(/A area corrigida é obrigatória/i);
    });

    // const fields = screen.getAllByRole('spinbutton');
    // const ph = fields[1];

    // userEvent.type(ph, '9');

    // userEvent.click(next);

    // await waitFor(() => {
    //   screen.getByText(/O valor máximo para o PH médio é 7/i);
    // });

    await waitFor(() => {
      expect(window.localStorage.getItem('ground')).toStrictEqual(null);
      expect(onNext).not.toBeCalled();
    });
  });

  it('Should not show validation message for valid values and should set values on localStorage and call onNext', async () => {
    const onNext = jest.fn();
    makeSut(onNext);

    expect(
      screen.queryByText(/A altitude média é obrigatória/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/A orografia é obrigatória/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/As propriedades físicas são obrigatórias/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/O PH é obrigatório/i)).not.toBeInTheDocument();
    // expect(
    //   screen.queryByText(/O valor mínimo para o PH médio é 1/i)
    // ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/O valor máximo para o PH médio é 7/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/A area corrigida é obrigatória/i)
    ).not.toBeInTheDocument();

    const next = screen.getByRole('button', { name: /próximo/i });

    userEvent.click(next);

    await waitFor(() => {
      screen.getByText(/A altitude média é obrigatória/i);
    });
    await waitFor(() => {
      screen.getByText(/A orografia é obrigatória/i);
    });
    await waitFor(() => {
      screen.getByText(/As propriedades físicas são obrigatórias/i);
    });
    // await waitFor(() => {
    //   screen.getByText(/O valor mínimo para o PH médio é 1/i);
    // });
    await waitFor(() => {
      screen.getByText(/A area corrigida é obrigatória/i);
    });

    const textField = screen.getAllByRole('textbox');
    const orografia = textField[0];
    const propFisicas = textField[1];

    const fields = screen.getAllByRole('spinbutton');
    const altitude = fields[0];
    // const ph = fields[1];
    const areaCorrigida = fields[1];

    userEvent.type(altitude, '139339');
    userEvent.type(orografia, '13333');
    userEvent.type(propFisicas, '6464');
    // userEvent.type(ph, '6');
    userEvent.type(areaCorrigida, '3');

    userEvent.click(next);

    await waitFor(() => {
      expect(
        screen.queryByText(/A altitude média é obrigatória/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/A orografia é obrigatória/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/As propriedades físicas são obrigatórias/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/O PH é obrigatório/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/O valor mínimo para o PH médio é 1/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/O valor máximo para o PH médio é 7/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/A area corrigida é obrigatória/i)
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(window.localStorage.getItem('ground')).toStrictEqual(
        JSON.stringify({
          altitude_media: '139339',
          orografia: '13333',
          propriedades_fisicas: '6464',
          area_corrigida: '3',
          // ph_medio: 6,
        })
      );

      expect(onNext).toBeCalled();
    });
  });

  it('Should complete step', async () => {
    const onNext = jest.fn();
    makeSut(onNext);

    const textField = screen.getAllByRole('textbox');
    const orografia = textField[0];
    const propFisicas = textField[1];

    const fields = screen.getAllByRole('spinbutton');
    const altitude = fields[0];
    // const ph = fields[1];
    const areaCorrigida = fields[1];

    const next = screen.getByRole('button', { name: /próximo/i });

    userEvent.type(altitude, '139339');
    userEvent.type(orografia, '13333');
    userEvent.type(propFisicas, '6464');
    // userEvent.type(ph, '6');
    userEvent.type(areaCorrigida, '3');

    userEvent.click(next);

    await waitFor(() => {
      expect(
        screen.queryByText(/A altitude média é obrigatória/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/A orografia é obrigatória/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/As propriedades físicas são obrigatórias/i)
      ).not.toBeInTheDocument();
      // expect(screen.queryByText(/O PH é obrigatório/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/O valor mínimo para o PH médio é 1/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/O valor máximo para o PH médio é 7/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/A area corrigida é obrigatória/i)
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(onNext).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(window.localStorage.getItem('ground')).toStrictEqual(
        JSON.stringify({
          altitude_media: '139339',
          orografia: '13333',
          propriedades_fisicas: '6464',
          area_corrigida: '3',
          // ph_medio: 6,
        })
      );
    });
  });

  // REVER  A VERIFICACAO DOS CAMPOS NAO OBRIGATORIOS QUE DEPENDEM DO CHECK DA ANALISE DO SOLO
  it('Should have values of entity to edit', () => {
    makeSut(undefined, fazendasMock);

    const fieldNumber = screen.getAllByRole('spinbutton');
    const alturaMedia = fieldNumber[0];
    const areaCorrigida = fieldNumber[1];
    // const phMedio = fieldNumber[2];

    const fieldText = screen.getAllByRole('textbox');
    const orografia = fieldText[0];
    const propriedadesFisicas = fieldText[1];

    expect(alturaMedia).toHaveAttribute(
      'value',
      `${fazendasMock.ground.altitude_media}`
    );
    // expect(phMedio).toHaveAttribute('value', `${fazendasMock.ground.ph_medio}`);
    expect(areaCorrigida).toHaveAttribute(
      'value',
      `${fazendasMock.ground.area_corrigida}`
    );
    expect(orografia).toHaveAttribute('value', `${fazendasMock.ground.orografia}`);
    expect(propriedadesFisicas).toHaveAttribute(
      'value',
      `${fazendasMock.ground.propriedades_fisicas}`
    );
  });
});
