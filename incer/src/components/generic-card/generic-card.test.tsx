import { render, screen } from '@testing-library/react';
import React from 'react';

import GenericCard from '.';

describe('GENERIC CARD', () => {
  const title = 'ola';
  const value = 10;
  const makeSut = () =>
    render(<GenericCard title={title} color="#666" value={value} />);
  it('Should render as expected', () => {
    makeSut();
    screen.getByText(title);
    screen.getByText(`${value}.00`);
  });
});
