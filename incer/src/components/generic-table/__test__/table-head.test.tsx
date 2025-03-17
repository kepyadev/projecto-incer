import { render, screen } from '@testing-library/react';
import React from 'react';

import TableHead from '../table-head';

describe('GENERIC TABLE', () => {
  const makeSut = () =>
    render(
      <TableHead
        cells={[
          { id: 'id', label: 'ID', numeric: false },
          { id: 'name', label: 'NAME', numeric: false },
        ]}
        hasOperation={false}
      />
    );
  it('Should render as expected', () => {
    makeSut();

    screen.getByText(/ID/i);
    screen.getByText(/NAME/i);
  });
});
