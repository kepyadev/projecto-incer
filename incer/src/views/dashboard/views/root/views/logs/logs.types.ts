/* eslint-disable import/prefer-default-export */
import { ICell } from '../../../../../../components/generic-table/table.types';
import { Entity } from '../../../../../../types';
import { ExtractHora, formatDate } from '../../../../../../utils';

export const cells: ICell[] = [
  { id: 'emailphone', label: 'Email/Telefone', numeric: false },
  { id: 'data', label: 'Data', numeric: false },
  { id: 'hora', label: 'Hora', numeric: false },
  { id: 'status', label: 'Estado', numeric: false },
  { id: 'operation', label: 'Operação', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as any[]).map((user: any) => ({
    ...user,
    data: formatDate(user.data),
    hora: ExtractHora(user.data),
  }));
};
