import { render, screen } from '@testing-library/react';
import React from 'react';

import SnackMessage from '.';
import { SnackMessageProps } from './snack-message.types';

const handleClose = jest.fn();
const defaultProps = {
  snackMessage: { message: 'Teste', isError: false },
  handleClose,
};

describe('SNACK MESSAGE', () => {
  const makeSut = (props: SnackMessageProps = defaultProps) =>
    render(
      <SnackMessage
        handleClose={props.handleClose}
        snackMessage={props.snackMessage}
      />
    );
  it('Should render with message', () => {
    makeSut();
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('should call onClose after 2000 milisseconds', () => {
    jest.useFakeTimers();
    makeSut();
    jest.runAllTimers();

    expect(handleClose).toHaveBeenCalled();
  });

  it('snackbar background should be green if no error', () => {
    makeSut();
    const alert = screen.getByLabelText('snackbar-alert');

    expect(alert).toHaveClass('MuiAlert-standardSuccess');
  });

  it('snackbar background should be red if an error', () => {
    makeSut({
      ...defaultProps,
      snackMessage: { ...defaultProps.snackMessage, isError: true },
    });
    const alert = screen.getByLabelText('snackbar-alert');

    expect(alert).toHaveClass('MuiAlert-standardError');
  });
});
