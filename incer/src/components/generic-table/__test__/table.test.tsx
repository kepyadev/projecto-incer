import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import GenericTable from '..';

const fakeFetcher = jest.fn();

describe('GENERIC TABLE', () => {
  const makeSut = () =>
    render(
      <GenericTable
        cells={[
          { id: '_id', label: 'ID', numeric: false },
          { id: 'name', label: 'NAME', numeric: false },
        ]}
        tableId="/htpp"
        fetcher={fakeFetcher}
        entityName="produtor"
        primaryKey="id"
      />
    );
  it('Should render as expected', async () => {
    const data = {
      data: {
        msg: 'ola',
        payload: {
          data: [{ _id: '9999', name: 'Zebedeu' }],
          count: 1,
        },
      },
    };

    (fakeFetcher as jest.Mock).mockResolvedValue(data);
    await act(async () => {
      makeSut();
    });
    screen.getByText(/ID/i);
    screen.getByText(/NAME/i);
    screen.getByText(/9999/i);
    screen.getByText(/Zebedeu/i);
  });
});
