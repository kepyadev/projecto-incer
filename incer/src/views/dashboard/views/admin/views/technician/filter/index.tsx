import { Grid } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Filter from '../../../../../../../components/filter';
import {
  Field,
  InputType,
} from '../../../../../../../components/filter/filter.types';
import { makeField } from '../../../../../../../components/filter/utils';
import { FilterFormProps } from '../../../../../../../components/generic-table/table.types';
import ProvinceComponent from '../../../../../../../components/province';
import { getAllProvinces } from '../../../../../../../services/province';
import { IProvince } from '../../../../../../../types';

const FilterTechnician: FC<FilterFormProps> = ({ formId, onFilter, values }) => {
  const { register, handleSubmit } = useForm();
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [selectedProvince, setSelectdProvince] = useState<string>();

  useEffect(() => {
    getAllProvinces()
      .then(response => {
        setProvinces(response.data?.payload.data);
      })
      .catch(() => {
        setProvinces([]);
      });
  }, []);

  const handleFormSubmit = handleSubmit(async formData => {
    Object.keys(formData).map(key => {
      if (formData[key] === undefined || formData[key] === '') delete formData[key];
      return key;
    });

    const data = { ...formData, province: selectedProvince };

    if (!selectedProvince) delete data.province;

    onFilter(data);
  });

  const handleChangeProvince = (value: string) => {
    setSelectdProvince(value);
  };

  const fields: Field[] = [
    {
      type: InputType.Text,
      name: 'name',
      label: 'Nome',
      ariaLabel: 'Tecnico',
      render: makeField,
      defaultValue: values ? values.name : undefined,
    },
  ];
  return (
    <form id={formId} onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Filter fields={fields} register={register} grid={false} />
        <ProvinceComponent
          provinces={provinces}
          lg={4}
          md={4}
          handleChangeOfProvince={handleChangeProvince}
          withCounty={false}
        />
      </Grid>
    </form>
  );
};

export default FilterTechnician;
