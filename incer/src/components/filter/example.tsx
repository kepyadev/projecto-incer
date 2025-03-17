import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FilterFormProps } from '../generic-table/table.types';
import Filter from '.';
import { Field, InputType } from './filter.types';
import { makeField, makeSelect } from './utils';

const FilterExample: FC<FilterFormProps> = ({ formId, onFilter }) => {
  const { register, handleSubmit } = useForm();
  const [selected, setSelected] = useState<string>('nao');
  // const [radio, setRadio] = useState<string>('sim');
  // const [check, setCheck] = useState<boolean>(true);
  // const [slideValue, setSlideValue] = useState([1000, 123000000]);

  const handleFormSubmit = handleSubmit(async formData => {
    const data = { ...formData };
    // console.log('SENDING', data);
    onFilter(data);
  });

  const handleChange = (value: string) => setSelected(value);

  // const handleRadio = (value: string) => setRadio(value);

  // const handleSwitch = () => setCheck(!check);

  // const handleSlide = (value: number[]) => setSlideValue(value);

  const fields: Field[] = [
    {
      key: 1,
      type: InputType.Text,
      name: 'name',
      label: 'Nome',
      render: makeField,
    },
    {
      key: 23,
      type: InputType.Text,
      name: 'nif',
      label: 'NIF',
      render: makeField,
    },
    {
      key: 241,
      type: InputType.Email,
      name: 'email',
      label: 'Email',
      render: makeField,
    },
    {
      key: 1363,
      type: InputType.Text,
      name: 'phone',
      label: 'Nº de telefone',
      render: makeField,
    },
    // {
    //   key: 122,
    //   type: InputType.Text,
    //   name: 'category',
    //   label: 'Categoria',
    //   render: makeField,
    // },
    {
      key: 336,
      type: InputType.Select,
      name: 'hhh',
      label: 'Select',
      options: [
        { key: 1, value: 'sim', label: 'Zebedeu' },
        { key: 2, value: 'nao', label: 'Jorge' },
      ],
      value: selected,
      handleChange,
      render: makeSelect,
    },
    // {
    //   key: 225,
    //   type: InputType.Date,
    //   name: 'idade',
    //   label: 'Idade',
    //   render: makeField,
    // },
    // {
    //   key: 474,
    //   type: InputType.Radio,
    //   name: 'opt',
    //   label: 'Options',
    //   options: [
    //     { key: 1, value: 'sim', label: 'Zebedeu' },
    //     { key: 2, value: 'nao', label: 'Ola' },
    //   ],
    //   defaultValue: 'sim',
    //   handleChange: handleRadio,
    //   render: makeRadioField,
    // },
    // {
    //   key: 542,
    //   type: InputType.Switch,
    //   name: 'deleted',
    //   label: 'Clientes desactivados',
    //   checked: check,
    //   handleChange: handleSwitch,
    //   render: makeSwitch,
    // },
    // {
    //   key: 856321,
    //   type: InputType.Slider,
    //   name: 'slider',
    //   label: 'Label slider',
    //   value: slideValue,
    //   ariaLabel: 'slider',
    //   handleChange: handleSlide,
    //   render: makeSlider,
    // },
  ];
  return (
    <form
      id={formId}
      onSubmit={e => {
        e.preventDefault();
        handleFormSubmit(e);
      }}
    >
      <Filter fields={fields} register={register} />
    </form>
  );
};

export default FilterExample;
