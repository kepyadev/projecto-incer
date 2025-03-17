import { render, screen } from '@testing-library/react';
import React from 'react';

import ForbidenPermission from '.';

describe('Forbiden Permission Component', () => {
  it('Should render as expected', () => {
    render(<ForbidenPermission />);
    screen.getByText(/Permissão Negada/i);
  });
});
