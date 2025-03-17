import { FC, Key, ReactNode, Ref } from 'react';

export enum InputType {
  Text = 'text',
  Select = 'select',
  Email = 'email',
  Number = 'number',
  Radio = 'radio',
  Date = 'date',
  Switch = 'switch',
  Slider = 'slider',
  Chip = 'chip',
}

interface Option {
  key: number;
  value: string;
  label: string;
}

export interface Field {
  key?: Key;
  type: InputType;
  name: string;
  label: string | string[] | Record<any, string>;
  ariaLabel?: string;
  defaultValue?: string | number | boolean | undefined;
  role?: string;
  handleChange?: (value: any) => any;
  handleIncrement?: (value: any) => void;
  render: (field: Field, register: Ref<any>) => ReactNode | FC;
  options?: Option[];
  checked?: boolean;
  value?:
    | string
    | number
    | boolean
    | number[]
    | boolean[]
    | Record<any, boolean>
    | Date;
  error?: boolean;
  helperText?: ReactNode;
  limit?: number;
}

export interface FilterFieldProps {
  fields: Field[];
  register: Ref<any>;
}

export interface FilterProps {
  fields: Field[];
  register: Ref<any>;
  grid?: boolean;
}
