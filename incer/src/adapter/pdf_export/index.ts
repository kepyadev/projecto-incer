import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { ICell } from '../../components/generic-table/table.types';
import {
  Alignment,
  PdfExport,
  pdfGenerate,
  pdfImageGenerate,
  pdfOrientation,
  pdfTableGenerate,
  pdfTextGenerate,
} from '../contracts/pdf_export.adapter';

const pdfMakeGenerate: pdfGenerate = (
  title: string,
  logo: string,
  content: any,
  oritation: pdfOrientation = pdfOrientation.Portrait
): void => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportFooter: any = (currentePage: number, countPage: number) => {
    return [
      {
        text: `CERPROD ${currentePage}/${countPage}`,
        bold: false,
        margin: [0, 10, 20, 0],
        alignment: 'right',
        fontSize: 8,
      },
    ];
  };

  pdfMake
    .createPdf({
      pageOrientation: oritation,
      pageSize: 'A4',
      pageMargins: [15, 50, 15, 40],
      header: [
        { image: logo, width: 100, margin: [15, 20, 0, 0] },
        {
          text: title,
          bold: true,
          fontSize: 12,
          margin: [15, 20, 25, -50],
          alignment: Alignment.Right,
        },
      ],
      content: [content],
      footer: reportFooter,
    })
    .download(`${title}.pdf`);
};

const pdfMakeTableGenerate: pdfTableGenerate = <T>(cells: ICell[], rows: T[]) => {
  const header = cells.map(cell => {
    return { text: cell.label, style: 'tableHeader', bold: true, fontSize: 9 };
  });

  const data = (rows as any[]).map(row => {
    return cells.map(cell => {
      return { text: row[cell.id], fontSize: 8, margin: [0, 2, 0, 2] };
    });
  });

  const width = cells.map(() => '*');
  const table = {
    table: {
      heardRows: 1,
      widths: width,
      body: [header, ...data],
    },
    layout: 'lightHorizontalLines',
  };
  return table;
};

const pdfMakeTextGenerate: pdfTextGenerate = (
  text: string,
  fontSize: number = 12,
  bold: boolean = false,
  align: Alignment = Alignment.Left,
  margin?: number[]
) => {
  return { text, fontSize, bold, alignment: align, margin };
};

const pdfMakeImageGenerate: pdfImageGenerate = (
  url: string,
  width?: number,
  height?: number,
  fit?: number[],
  opacity?: number
) => {
  return {
    image: url,
    width,
    height,
    fit,
    opacity,
  };
};

const PdfMake: PdfExport = {
  execute: pdfMakeGenerate,
  table: pdfMakeTableGenerate,
  textGenerator: pdfMakeTextGenerate,
  imageGenerator: pdfMakeImageGenerate,
};

export default PdfMake;
