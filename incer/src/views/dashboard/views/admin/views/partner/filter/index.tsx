import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import Filter from '../../../../../../../components/filter';
import {
  Field,
  InputType,
} from '../../../../../../../components/filter/filter.types';
import { makeField } from '../../../../../../../components/filter/utils';
import { FilterFormProps } from '../../../../../../../components/generic-table/table.types';

const FilterPartner: FC<FilterFormProps> = ({ formId, onFilter, values }) => {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = handleSubmit(async formData => {
    Object.keys(formData).map(key => {
      if (formData[key] === undefined || formData[key] === '') delete formData[key];
      return key;
    });

    const data = { ...formData };

    onFilter(data);
  });

  const fields: Field[] = [
    {
      type: InputType.Text,
      name: 'name',
      label: 'Nome',
      ariaLabel: 'Parceiro',
      render: makeField,
      defaultValue: values ? values.name : undefined,
    },
    {
      type: InputType.Text,
      name: 'ministerio',
      label: 'Nome',
      ariaLabel: 'Ministerio',
      render: makeField,
      defaultValue: values ? values.ministerio : undefined,
    },
  ];
  return (
    <form id={formId} onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Filter fields={fields} register={register} grid={false} />
      </Grid>
    </form>
  );
};

export default FilterPartner;
