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
import { clearEmptyFields } from '../../../../../../../utils';

const FilterCultura: FC<FilterFormProps> = ({ formId, onFilter, values }) => {
  const { register, handleSubmit } = useForm();
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [selectedProvince, setSelectdProvince] = useState<string>();
  const [selectedCounty, setSelectdCounty] = useState<string>();

  useEffect(() => {
    getAllProvinces()
      .then(response => {
        setProvinces(response.data?.payload.data);
      })
      .catch(() => {
        setProvinces([]);
      });
  }, []);

  const handleChangeProvince = (value: string) => {
    setSelectdProvince(value);
  };

  const handleChangeCounty = (value: string) => {
    setSelectdCounty(value);
  };

  const handleFormSubmit = handleSubmit(async formData => {
    clearEmptyFields(formData);

    const data = { ...formData, province: selectedProvince, county: selectedCounty };

    if (!selectedProvince) delete data.province;
    if (!selectedCounty) delete data.county;

    onFilter(data);
  });

  const fields: Field[] = [
    {
      type: InputType.Text,
      name: 'type',
      label: 'Nome',
      ariaLabel: 'Cultura',
      render: makeField,
      defaultValue: values ? values.type : undefined,
    },
    {
      type: InputType.Text,
      name: 'fazenda',
      label: 'Produtor',
      ariaLabel: 'Fazenda',
      render: makeField,
      defaultValue: values ? values.fazenda : undefined,
    },
  ];
  return (
    <form id={formId} onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Filter fields={fields} register={register} grid={false} />
        <ProvinceComponent
          provinces={provinces}
          handleChangeOfCounty={handleChangeCounty}
          handleChangeOfProvince={handleChangeProvince}
        />
      </Grid>
    </form>
  );
};

export default FilterCultura;
