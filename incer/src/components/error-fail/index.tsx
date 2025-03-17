import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import boundry from '../../assets/img/undraw_bug_fixing_oc7a.svg';

interface ErrorFailProps {
  text?: string;
}
const ErrorFail: FC<ErrorFailProps> = ({ text }) => {
  return (
    <Box style={{ textAlign: 'center' }}>
      <Typography variant="h5">{text || 'Lamentamos, ocorreu uma falha'}</Typography>
      <img
        src={boundry}
        alt="error-icon"
        style={{ width: '100%', marginBottom: '16px' }}
      />
    </Box>
  );
};

export default ErrorFail;
