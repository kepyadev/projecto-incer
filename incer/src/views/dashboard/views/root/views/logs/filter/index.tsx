import { Grid } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import Filter from '../../../../../../../components/filter';
import {
  Field,
  InputType,
} from '../../../../../../../components/filter/filter.types';
import { makeField, makeSelect } from '../../../../../../../components/filter/utils';
import { FilterFormProps } from '../../../../../../../components/generic-table/table.types';

const FilterLog: FC<FilterFormProps> = ({ formId, onFilter, values }) => {
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState<string>('');
  // const [datas, setData] = useState<Date | null>(null);

  const handleFormSubmit = handleSubmit(async formData => {
    Object.keys(formData).map(key => {
      if (formData[key] === undefined || formData[key] === '') delete formData[key];
      return key;
    });

    const ddd =
      typeof formData?.data === 'string'
        ? formData.data.substring(0, 10).split('-')
        : undefined;

    const data: { [x: string]: any } = {
      ...formData,
      status,
      data: ddd ? `${ddd[2]}/${ddd[1]}/${ddd[0]}` : undefined,
    };

    if (!status || status === '') delete data.status;

    onFilter(data);
  });

  const fields: Field[] = [
    {
      type: InputType.Text,
      name: 'emailphone',
      label: 'Nome',
      ariaLabel: 'E-mail/Telefone',
      render: makeField,
      defaultValue: values ? values.emailphone : undefined,
    },
    {
      type: InputType.Date,
      name: 'data',
      label: 'Data',
      ariaLabel: 'Data',
      render: makeField,
      defaultValue: values ? values.data : undefined,
    },
    {
      type: InputType.Select,
      name: 'status',
      label: 'Estado',
      ariaLabel: 'Estado',
      options: [
        { value: '', label: 'Todas', key: 0 },
        { value: 'Sucesso', label: 'Sucesso', key: 2 },
        { value: 'Credênciais inválidas', label: 'Credências inválidas', key: 3 },
      ],
      handleChange: (value: string) => {
        setStatus(value);
      },
      render: makeSelect,
      defaultValue: values ? values.status : undefined,
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

export default FilterLog;
