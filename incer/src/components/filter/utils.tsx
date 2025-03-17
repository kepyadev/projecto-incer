import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TextField,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { Ref } from 'react';
import { v4 } from 'uuid';

import { Field } from './filter.types';

const style = {
  flex: 1,
  '& > div': {
    width: '100%',
  },
};

export const makeField = (field: Field, register: Ref<any>) => {
  const { name, role, type, defaultValue } = field;
  return (
    <TextField
      type={type}
      name={name}
      inputRef={register}
      inputProps={{
        role,
        'aria-label': field.ariaLabel || field.name,
      }}
      style={style}
      variant="outlined"
      error={field.error}
      placeholder={field.ariaLabel || field.name}
      helperText={field.helperText}
      defaultValue={defaultValue}
    />
  );
};

export const makeSelect = (field: Field) => (
  <FormControl style={style}>
    <Select
      native
      variant="outlined"
      labelId={`selectbox-label-${field.key}`}
      id={`selectbox-${field.key}`}
      value={field.value || field.defaultValue}
      onChange={value => {
        if (field.handleChange) field.handleChange(value.target.value);
      }}
      inputProps={{ role: 'select' }}
      fullWidth
      error={field.error}
    >
      {field.options?.map(({ value, label, key }) => (
        <option key={key} value={value as string}>
          {label}
        </option>
      ))}
    </Select>
  </FormControl>
);

export const makeRadioField = (field: Field) => (
  <FormControl component="fieldset">
    <RadioGroup
      row
      aria-label={field.label as string}
      name={field.name}
      value={field.value || field.defaultValue}
      onChange={value => {
        if (field.handleChange) field.handleChange(value.target.value);
      }}
      style={{ display: 'flex', flexDirection: 'row' }}
      role={field.role || 'radio'}
    >
      {field.options?.map(({ key, value, label }) => (
        <FormControlLabel
          key={key}
          value={value}
          control={<Radio color="primary" />}
          label={label}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export const makeSwitch = (field: Field) => (
  <Switch
    checked={field.checked || false}
    onChange={() => {
      if (field.handleChange) field.handleChange(!field.checked);
    }}
    color="primary"
  />
);

export enum ProcessesStatus {
  Accepted = 'accepted',
  Pending = 'pending',
  Rejected = 'rejected',
}

export const makeChips = (field: Field) => {
  const { label, value, handleChange } = field;

  const values = value as Record<ProcessesStatus, boolean>;
  const labels = label as Record<ProcessesStatus, string>;

  const root = { padding: 12, fontSize: 18 };

  const styles = {
    unselected: {
      ...root,
      color: '#949494',
      backgroundColor: '#EEEEEE',
    },
    selected: {
      ...root,
      color: '#0C2178',
      backgroundColor: '#E8EAFF',
    },
  } as const;

  return (
    <>
      {Object.entries(ProcessesStatus).map(([_, val]) => (
        <Box
          key={v4()}
          onClick={() => {
            if (handleChange)
              handleChange({
                [val]: !values[val],
              });
          }}
        >
          <Chip
            clickable
            label={labels[val]}
            style={values[val] ? styles.selected : styles.unselected}
          />
        </Box>
      ))}
    </>
  );
};

export const makeSlider = (field: Field) => {
  const { value, handleChange, handleIncrement, ariaLabel, limit } = field;
  const [min, max] = value as number[];

  const slideValueStyle = {
    backgroundColor: '#EEEEEE',
    borderRadius: '20px',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
  };
  return (
    <>
      <div style={slideValueStyle}>{min}</div>
      <Slider
        max={limit}
        min={0}
        value={value as number[]}
        onChangeCommitted={(_e, newValue) => {
          if (handleChange) handleChange(newValue);
        }}
        onChange={(_e, newValue) => {
          if (handleChange) handleChange(newValue);
        }}
        valueLabelDisplay="off"
        aria-labelledby={ariaLabel || 'slider'}
      />
      <div style={slideValueStyle}>{max}</div>
      <IconButton
        onClick={handleIncrement}
        size="small"
        aria-labelledby="slider-limit-increment-button"
      >
        <Add />
      </IconButton>
    </>
  );
};
