import { Box } from '@material-ui/core';
import React, { FC } from 'react';

import Loading from '../Loading';
import SVG from '../svg';
import useStyles from './generic-card.styles';
import { GenericCardProps } from './generic-card.types';

const GenericCard: FC<GenericCardProps> = ({
  color,
  title,
  paths,
  value,
  loading = false,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box
        style={{ backgroundColor: color, color: '#fff' }}
        className={classes.root}
      >
        {!loading ? (
          <>
            <div style={{ width: '46px' }}>{paths && <SVG paths={paths} />}</div>
            <div style={{ fontSize: '30pt', fontWeight: 'bold' }}>{value}</div>
            <div className={classes.title}>
              {title} <br />
              <hr
                style={{
                  color: '#fff',
                  border: '2px solid #fff',
                  width: '40%',
                  float: 'left',
                }}
              />
            </div>
          </>
        ) : (
          <Loading color="secondary" />
        )}
      </Box>
    </>
  );
};

export default GenericCard;
