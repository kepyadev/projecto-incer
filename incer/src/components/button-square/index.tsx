import { Box, Button, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import pallete from '../../theme/colors';
import useStyles from './button-square.styles';
import { ButtonSquareProps } from './button-square.types';

const ButtonSquare: FC<ButtonSquareProps> = ({ text, SvgPath, url }) => {
  const history = useHistory();
  const parent = history.location.pathname.split('/').slice(0, 3).join('/');
  const isActive = parent === url;
  const color = isActive ? '#fff' : pallete.SENCODARY;
  const background = isActive ? pallete.PRIMARY : '#fff';
  const classes = useStyles();

  return (
    <Button style={{ width: '50%' }} onClick={() => history.push(url)}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        style={{}}
        className={classes.buttonBox}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          justifyItems="center"
          style={{
            backgroundColor: background,
          }}
          className={classes.iconContainer}
        >
          <SvgPath color={color} />
        </Box>
        <Box
          style={{
            display: 'flex',
            height: '30px',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="body2"
            style={{ fontWeight: 'bold', fontSize: '8pt', textAlign: 'center' }}
          >
            {text}
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};

export default ButtonSquare;
