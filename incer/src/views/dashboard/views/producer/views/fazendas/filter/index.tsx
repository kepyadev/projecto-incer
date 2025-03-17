import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import Filter from '../../../../../../../components/filter';
import {
  Field,
  InputType,
} from '../../../../../../../components/filter/filter.types';
import { makeField } from '../../../../../../../components/filter/utils';
import { FilterFormProps } from '../../../../../../../components/generic-table/table.types';
import { clearEmptyFields } from '../../../../../../../utils';

const FilterFazenda: FC<FilterFormProps> = ({ formId, onFilter, values }) => {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = handleSubmit(async formData => {
    clearEmptyFields(formData);
    const data = { ...formData };

    onFilter(data);
  });

  const fields: Field[] = [
    {
      type: InputType.Text,
      name: 'description',
      label: 'Nome',
      ariaLabel: 'Nome',
      render: makeField,
      defaultValue: values ? values.description : undefined,
    },
    {
      type: InputType.Text,
      name: 'gerencia',
      label: 'Gerente',
      ariaLabel: 'Gerente',
      render: makeField,
      defaultValue: values ? values.gerencia : undefined,
    },
  ];
  return (
    <form id={formId} onSubmit={handleFormSubmit}>
      <Filter fields={fields} register={register} />
    </form>
  );
};

export default FilterFazenda;
