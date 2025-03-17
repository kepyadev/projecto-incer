import { ICell } from '../../components/generic-table/table.types';

export type pdfGenerate = (
  title: string,
  logo: string,
  content: any,
  orientation: pdfOrientation
) => void;

export type pdfTableGenerate = <T>(cells: ICell[], rows: T[]) => unknown;

interface _ITextProps {
  text: string;
  fontSize?: number;
  bold?: boolean;
}

export enum Alignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}
export type pdfTextGenerate = (
  text: string,
  fontSize?: number,
  bold?: boolean,
  alignment?: Alignment,
  margin?: number[]
) => unknown;

export enum pdfOrientation {
  landscape = 'landscape',
  Portrait = 'portrait',
}

export type pdfImageGenerate = (
  url: string,
  width?: number,
  height?: number,
  fit?: number[],
  opacity?: number
) => unknown;

export interface PdfExport {
  table: pdfTableGenerate;
  execute: pdfGenerate;
  textGenerator: pdfTextGenerate;
  imageGenerator: pdfImageGenerate;
}
