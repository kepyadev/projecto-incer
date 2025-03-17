import { Box, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { FC } from 'react';

const NotData: FC = () => {
  return (
    <Box style={{ padding: '20px 0px' }}>
      <Alert aria-label="snackbar-alert" severity="info">
        <Typography> Sem dados para exibir </Typography>
      </Alert>
    </Box>
  );
};

export default NotData;
