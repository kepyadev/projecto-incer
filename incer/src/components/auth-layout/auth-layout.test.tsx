import { render, screen } from '@testing-library/react';
import React from 'react';

import AuthLayout from '.';

describe('AUTH LAYOUT', () => {
  const makeSut = () =>
    render(
      <AuthLayout title="titulo" isShownigLogo>
        children
      </AuthLayout>
    );
  it('Should render as expected', () => {
    makeSut();

    screen.getByText('titulo');
    screen.getByText('children');
  });
});
