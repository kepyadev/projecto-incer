import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { v4 } from 'uuid';

import useStyles from './filter.styles';
import { FilterFieldProps, FilterProps } from './filter.types';

const Field: FC<FilterFieldProps> = ({ fields, register }) => {
  const classes = useStyles();

  return (
    <>
      {fields.map(field => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          key={v4()}
          className={classes.inputGroup}
        >
          {/* {typeof field.label === 'string' && (
        <InputLabel htmlFor="planType">{field.label}</InputLabel>
      )} */}
          {field.render(field, register)}
        </Grid>
      ))}
    </>
  );
};

const Filter: FC<FilterProps> = ({ fields, register, grid = true }) => {
  if (grid)
    return (
      <Grid container spacing={2}>
        <Field fields={fields} register={register} />
      </Grid>
    );

  return <Field fields={fields} register={register} />;
};

export default Filter;
