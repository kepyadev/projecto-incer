import { formatNumber } from 'accounting';

import { ICooperative } from '../types/cooperative';
import { IProducer } from '../types/producer';
// eslint-disable-next-line import/prefer-default-export
export const formatDate = (data?: Date | string): string => {
  if (!data) return '';
  if (typeof data === 'string') return new Date(data).toLocaleDateString('pt');
  return data.toLocaleDateString('pt');
};

export const ExtractHora = (data?: Date | string): string => {
  if (!data) return '';
  if (typeof data === 'string') return new Date(data).toLocaleTimeString('pt');
  return data.toLocaleString('pt');
};

export const getActiveItem = () => localStorage.getItem('active_item');

export const setActiveItem = (id: string) => localStorage.setItem('active_item', id);

export const getCooperativeLogged = (): ICooperative =>
  JSON.parse(localStorage.getItem('auth') || '').cooperative;

export const getProducerLogged = (): IProducer =>
  JSON.parse(localStorage.getItem('auth') || '').producer;

export const phoneRegex = /^9\d{8}$/;

export const emailRegex = RegExp(
  /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
);

export const biRegex = RegExp(/^[0-9]{9}[A-Za-z]{2}[0-9]{3}$/);

export const formatNumberDecimal = (value: number) => formatNumber(value, 2);

export const formatPhone = (phone: number) => {
  const phoneString = phone as unknown as string;
  const operadora = phoneString.slice(0, 3);
  const firstGroup = phoneString.slice(3, 6);
  const secondGroup = phoneString.slice(6, 9);

  return `(+244) ${operadora} ${firstGroup} ${secondGroup}`;
};

export const clearEmptyFields = (data: Record<string, any>) => {
  return Object.keys(data).map(key => {
    if (data[key] === undefined || data[key] === '') delete data[key];
    return key;
  });
};

export const getMonth = (date: string) => {
  const dateMonth = date.slice(5, 7);
  switch (dateMonth) {
    case '01':
      return 'Janeiro';
    case '02':
      return 'Fevereiro';
    case '03':
      return 'Março';
    case '04':
      return 'Abril';
    case '05':
      return 'Maio';
    case '06':
      return 'Junho';
    case '07':
      return 'Julho';
    case '08':
      return 'Agosto';
    case '09':
      return 'Setembro';
    case '10':
      return 'Outubro';
    case '11':
      return 'Novembro';
    case '12':
      return 'Dezembro';

    default:
      return 'Mês inválido';
  }
};
