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
import getAllProvinces from '../../../../../../../services/province';
import { IProvince } from '../../../../../../../types';

const FilterCooperative: FC<FilterFormProps> = ({ formId, onFilter, values }) => {
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
    Object.keys(formData).map(key => {
      if (formData[key] === undefined || formData[key] === '') delete formData[key];
      return key;
    });

    const data = { ...formData, province: selectedProvince, county: selectedCounty };

    if (!selectedProvince) delete data.province;
    if (!selectedCounty) delete data.county;

    onFilter(data);
  });

  const fields: Field[] = [
    {
      type: InputType.Text,
      name: 'name',
      label: 'name',
      ariaLabel: 'Cooperativa',
      render: makeField,
      defaultValue: values ? values.name : undefined,
    },
    {
      type: InputType.Text,
      name: 'president',
      label: 'Presidente',
      ariaLabel: 'Presidente',
      render: makeField,
      defaultValue: values ? values.president : undefined,
    },
  ];
  return (
    <form id={formId} onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Filter fields={fields} register={register} grid={false} />
        <ProvinceComponent
          provinces={provinces}
          lg={3}
          md={3}
          sm={6}
          xs={12}
          handleChangeOfCounty={handleChangeCounty}
          handleChangeOfProvince={handleChangeProvince}
        />
      </Grid>
    </form>
  );
};

export default FilterCooperative;
