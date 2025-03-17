import { ICell } from '../../../../../../../../../components/generic-table/table.types';
import {
  Infraestrutura,
  InfraestruturaType,
} from '../../../../../../../../../constants/sub-entites';
import { Entity, IInfraestrutura } from '../../../../../../../../../types';
import { formatNumberDecimal } from '../../../../../../../../../utils';

export interface InfraestruturaProps {
  fazendaId: string;
}

export const dataModifier = (data: ReadonlyArray<Entity>): ReadonlyArray<Entity> => {
  return (data as unknown as IInfraestrutura[]).map(infraestrutura => {
    return {
      ...infraestrutura,
      [Infraestrutura.Type]:
        infraestrutura[Infraestrutura.Type][InfraestruturaType.Description],
      [Infraestrutura.Quantity]: `${formatNumberDecimal(
        infraestrutura[Infraestrutura.Quantity]
      )} `,
      [Infraestrutura.Capacity]: `${infraestrutura[Infraestrutura.Capacity]} ${
        infraestrutura[Infraestrutura.Unidade]
      }`,
    };
  });
};

export const cells: ICell[] = [
  { id: Infraestrutura.Type, label: 'Tipo', numeric: false },
  { id: Infraestrutura.Quantity, label: 'Quantidade', numeric: false },
  { id: Infraestrutura.Capacity, label: 'Capacidade', numeric: false },
];
