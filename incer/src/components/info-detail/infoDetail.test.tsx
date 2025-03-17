import { render, screen } from '@testing-library/react';
import React from 'react';

import InfoDetail from './index';

describe('PAYMENT DETAILS', () => {
  const fields = [
    { label: 'member', value: 'chissola' },
    { label: 'client', value: 'Zebedeu' },
  ];
  const makeSut = () => render(<InfoDetail fields={fields} />);
  it('should render as expected', () => {
    makeSut();

    expect(screen.getByText(`member`)).toBeInTheDocument();
    expect(screen.getByText(`client`)).toBeInTheDocument();
  });
});
