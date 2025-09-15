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
import { clearEmptyFields } from '../../../../../../../utils';

const FilterFazenda: FC<FilterFormProps> = ({ formId, onFilter, values }) => {
  const { register, handleSubmit } = useForm();
  const [provinces, setProvinces] = useState<IProvince[]>();
  const [selectedProvince, setSelectdProvince] = useState<string>();
  const [selectedCounty, setSelectdCounty] = useState<string>();
  // const [radio, setRadio] = useState<string>('sim');
  // const [check, setCheck] = useState<boolean>(true);
  // const [slideValue, setSlideValue] = useState([1000, 123000000]);
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
      name: 'description',
      label: 'Nome',
      ariaLabel: 'Nome',
      render: makeField,
      defaultValue: values ? values.description : undefined,
    },
    {
      type: InputType.Text,
      name: 'producer_id',
      label: 'Produtor',
      ariaLabel: 'Produtor',
      render: makeField,
      defaultValue: values ? values.producer_id : undefined,
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
          handleChangeOfCounty={handleChangeCounty}
          handleChangeOfProvince={handleChangeProvince}
        />
      </Grid>
    </form>
  );
};

export default FilterFazenda;
