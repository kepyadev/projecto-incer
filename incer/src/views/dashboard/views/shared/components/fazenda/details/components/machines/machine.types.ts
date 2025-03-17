import { ICell } from '../../../../../../../../../components/generic-table/table.types';
import {
  Alfaia,
  Equipamento,
  Machine,
  MachineType,
  Power,
} from '../../../../../../../../../constants/sub-entites';
import { Entity, IEquipamento, IMachine } from '../../../../../../../../../types';
import { formatNumberDecimal } from '../../../../../../../../../utils';

export const cellsEquipamentos: ICell[] = [
  { id: Equipamento.Alfaia, label: 'Equipamentos', numeric: false },
  { id: Equipamento.Quantity, label: 'Quantidade', numeric: false },
  { id: Equipamento.Caracteristicas, label: 'Caracteristicas', numeric: false },
];

export const cells: ICell[] = [
  { id: Machine.Type, label: 'Tipo', numeric: false },
  { id: Machine.Quantity, label: 'Quantidade', numeric: false },
  { id: Machine.Power, label: 'Potência', numeric: false },
];

export interface MachineProps {
  fazendaId: string;
}

export const machineModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IMachine[]).map(machine => {
    return {
      ...machine,
      [Machine.Type]: machine[Machine.Type][MachineType.Description],
      [Machine.Power]: `${formatNumberDecimal(
        machine[Machine.Power][Power.Value]
      )} ${machine[Machine.Power][Power.Unidade]}`,
      [Machine.Quantity]: formatNumberDecimal(machine[Machine.Quantity]),
    };
  });
};

export const equipamentoModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IEquipamento[]).map(equipamento => {
    return {
      ...equipamento,
      [Equipamento.Alfaia]: equipamento[Equipamento.Alfaia][Alfaia.Description],
      [Equipamento.Caracteristicas]: equipamento[Equipamento.Caracteristicas],
      [Equipamento.Quantity]: formatNumberDecimal(equipamento[Equipamento.Quantity]),
    };
  });
};
