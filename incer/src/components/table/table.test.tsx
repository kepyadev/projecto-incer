import { render, screen } from '@testing-library/react';
import React from 'react';

import { ICell } from '../generic-table/table.types';
import TableWithoutFetcher from '.';

describe('TABLE WITHOUT FETCHER', () => {
  const rowsMock = [
    {
      id: '04482',
      name: 'Zebedeu',
    },
  ];

  const cells: ICell[] = [
    { id: 'id', label: '#', numeric: true },
    { id: 'name', label: 'Nome', numeric: false },
    { id: 'age', label: 'Idade', numeric: false },
  ];
  const makeSut = (rows: ReadonlyArray<any> = rowsMock) =>
    render(<TableWithoutFetcher rows={rows} cells={cells} entityName="example" />);
  it('it should render as expected ', () => {
    makeSut();

    screen.getByText(/#/i);
    screen.getByText(/nome/i);

    screen.getByText(/04482/i);
    screen.getByText(/zebedeu/i);
    screen.getAllByText(/-/i);
  });

  it('it should render no data when row is empty array ', () => {
    makeSut([]);

    screen.getByText(/sem dados para exibir/i);
  });
});
