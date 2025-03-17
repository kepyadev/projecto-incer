import { FC } from 'react';

import { PdfExport } from '../../adapter/contracts/pdf_export.adapter';
import { HttpResponse, ListDataResponse } from '../../services/services.types';
import { Entity } from '../../types';
import { MsgData } from '../../types/services';

export interface TableHeadProps {
  cells: ICell[];
  hasOperation: boolean;
}

export interface ICell {
  id: string;
  label: string;
  numeric: boolean;
}
export interface TableContentProps {
  rows: ReadonlyArray<Entity>;
  cells: ICell[];
  onDelete?: (primaryKey: string | number) => Promise<HttpResponse<any>>;
  setOpenEdit?: (val: boolean) => void;
  primaryKey: string;
  entityName: string;
  onSelectOne?: (id: string) => void;
  page: number;
  rowsPerPage: number;
}

export interface FilterFormProps {
  formId: string;
  onFilter: (filterData: Record<string, any>) => void;
  values?: Record<string, string | number | boolean | undefined>;
}

export type MutateFunction = (
  data?: HttpResponse<MsgData<ListDataResponse<readonly Entity[]>>>
) => Promise<HttpResponse<MsgData<ListDataResponse<readonly Entity[]>>> | undefined>;

export type IDataModifier = (data: ReadonlyArray<Entity>) => ReadonlyArray<Entity>;

export type IFilterFieldLabel = Record<string, string>;
export interface GenericTableProps {
  tableId: string;
  fetcher: (...args: any) => Promise<HttpResponse<MsgData<ListDataResponse<any>>>>;
  entityName: string;
  rows?: ReadonlyArray<Entity>;
  cells: ICell[];
  dataModifier?: IDataModifier;
  onCreate?: (mutate: MutateFunction) => void;
  onDelete?: (primaryKey: string | number) => Promise<HttpResponse<any>>;
  primaryKey: string;
  setOpenEdit?: (val: boolean) => void;
  onSelectOne?: (id: string) => void;
  title?: string;
  height?: string;
  importData?: (
    data: Record<any, unknown>[]
  ) => Promise<HttpResponse<MsgData<ListDataResponse<ReadonlyArray<any>>>>>;
  pdf?: PdfExport;
  FilterForm?: FC<FilterFormProps>;
  filterFieldLabels?: IFilterFieldLabel;
  pagination?: boolean;
}

export const RowsPerPageValues = [15, 25, 50];
