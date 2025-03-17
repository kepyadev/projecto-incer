import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ConfirmModal from '.';

describe('CONFIRM MODAL', () => {
  const makeSut = (
    onClose: () => void = jest.fn(),
    onAction: () => unknown = jest.fn()
  ) => render(<ConfirmModal text="ola" open onClose={onClose} action={onAction} />);
  it('Should render as expected', () => {
    makeSut();

    screen.getByText(/confirmação/i);
    screen.getByText(/ola/i);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('Should call handleClose when click on cancler button', async () => {
    const handleClose = jest.fn();
    makeSut(handleClose);

    const buttonCancel = screen.getByText(/cancelar/i);
    userEvent.click(buttonCancel);

    await waitFor(async () => {
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('Should call handleConfirm when click on confirm button', async () => {
    const handleConfirm = jest.fn();
    makeSut(jest.fn(), handleConfirm);

    const buttonConfirm = screen.getByText(/confirmar/i);
    userEvent.click(buttonConfirm);

    await waitFor(async () => {
      expect(handleConfirm).toHaveBeenCalled();
    });
  });
});
