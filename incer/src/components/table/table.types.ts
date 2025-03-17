import { Entity } from '../../types';
import { ICell } from '../generic-table/table.types';

export interface TableWithouFetcherProps {
  entityName: string;
  rows: ReadonlyArray<any>;
  cells: ICell[];
  height?: string;
  onCreate?: () => void;
  onSelectOne?: (id: string) => void;
  primaryKey?: string;
  title?: string;
  dataModifier?: (data: ReadonlyArray<Entity>) => ReadonlyArray<Entity>;
}

export const RowsPerPageValues = [5, 10, 50];
