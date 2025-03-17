import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import GenericModal from '.';

const handleClose = jest.fn();
describe('GENERIC MODAL', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const title = 'titulo';
  const makeSut = () =>
    render(
      <GenericModal title={title} onClose={handleClose} open>
        children
      </GenericModal>
    );
  it('Should render as expected', () => {
    makeSut();
    screen.getByText(title);
    screen.getByText(/children/i);
    screen.getByRole('button', { name: /close/i });
  });

  it('Should be closed', async () => {
    makeSut();
    screen.getByText(title);
    screen.getByText(/children/i);
    const buttonClose = screen.getByRole('button', { name: /close/i });

    userEvent.click(buttonClose);

    await waitFor(async () => {
      expect(handleClose).toBeCalled();
    });
  });
});
