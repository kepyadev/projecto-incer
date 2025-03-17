import { render, screen } from '@testing-library/react';
import React from 'react';

import TableContent from '../table-content';

describe('GENERIC TABLE', () => {
  const makeSut = () =>
    render(
      <TableContent
        entityName="Fazenda"
        primaryKey="_id"
        cells={[
          { id: '_id', label: 'ID', numeric: false },
          { id: 'name', label: 'NAME', numeric: false },
        ]}
        rows={[{ _id: '9999', name: 'Zebedeu' }]}
      />
    );
  it('Should render as expected', () => {
    makeSut();

    screen.getByText(/9999/i);
    screen.getByText(/Zebedeu/i);
  });
});
