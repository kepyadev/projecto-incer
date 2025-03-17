import { Box, CircularProgress } from '@material-ui/core';
import React, { FC } from 'react';

interface ILoadingProps {
  withText?: boolean;
  color?: 'primary' | 'secondary' | 'inherit';
}
const Loading: FC<ILoadingProps> = ({ withText = true, color = 'primary' }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignContent="center"
      alignItems="center"
      style={{ textAlign: 'center' }}
    >
      {' '}
      <CircularProgress color={color} />
      {withText && 'Carregando'}
    </Box>
  );
};

export default Loading;
