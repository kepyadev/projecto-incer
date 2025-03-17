import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { FC } from 'react';

import { SnackMessageProps } from './snack-message.types';

const SnackMessage: FC<SnackMessageProps> = ({
  handleClose,
  snackMessage,
  ...rest
}) => {
  return (
    <Snackbar
      open={!!snackMessage}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={2000}
      onClose={handleClose}
      key="toast"
      style={{ maxWidth: 400 }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <Alert
        aria-label="snackbar-alert"
        onClose={handleClose}
        severity={snackMessage?.isError ? 'error' : 'success'}
      >
        {snackMessage?.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackMessage;
