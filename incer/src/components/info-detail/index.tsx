import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { v4 } from 'uuid';

import useStyles from './infoDetail.styles';
import { InfoDetailProps } from './infoDetail.types';

const InfoDetail: FC<InfoDetailProps> = ({ fields }) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          boxShadow: '2px 2px 10px 1px rgba(0, 0, 0, 0.2)',
          margin: '16px 0px',
          marginBottom: '32px',
          padding: '16px 8px',
          width: '100%',
          borderRadius: '8px',
        }}
      >
        {fields.map(field => (
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={3}
            className={classes.pageMainInfo}
            key={v4()}
          >
            <Typography className={classes.infoHeader}>{field.label}</Typography>
            <Typography className={classes.infoDescription}>
              {field.value || '-'}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default InfoDetail;
