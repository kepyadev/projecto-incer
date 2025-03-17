import { ICell } from '../../../../../../../../../components/generic-table/table.types';
import {
  MeioEstacionario,
  Power,
} from '../../../../../../../../../constants/sub-entites';
import { Entity, IMeioEstacionario } from '../../../../../../../../../types';
import { formatNumberDecimal } from '../../../../../../../../../utils';

export interface MeiosEstacionariosProps {
  fazendaId: string;
}

export const cells: ICell[] = [
  { id: MeioEstacionario.Type, label: 'Tipo', numeric: false },
  { id: MeioEstacionario.Quantity, label: 'Quantidade', numeric: false },
  { id: MeioEstacionario.PowerValue, label: 'Potência', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IMeioEstacionario[]).map(meio => {
    return {
      ...meio,
      [MeioEstacionario.Id]: meio[MeioEstacionario.Id],
      [MeioEstacionario.Type]: meio[MeioEstacionario.Type].description,
      [MeioEstacionario.PowerValue]: `${formatNumberDecimal(
        meio[MeioEstacionario.PowerValue][Power.Value]
      )} ${meio[MeioEstacionario.PowerValue][Power.Unidade]}`,
      [MeioEstacionario.Quantity]: `${formatNumberDecimal(
        meio[MeioEstacionario.Quantity]
      )}`,
    };
  });
};
