import * as yup from 'yup';

import { NationalMarketPricesTypes } from '../../../../../../../../constants/entities';

const validationSchema = yup.object().shape({
  [NationalMarketPricesTypes.Product]: yup
    .string()
    .required('O produto é obrigatório'),
  [NationalMarketPricesTypes.Year]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('O ano é obrigatório')
    .positive('O ano deve ser um número positivo')
    .integer('O ano deve ser um número inteiro'),
  [NationalMarketPricesTypes.AveragePrice]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('O preço médio é obrigatório')
    .positive('O preço médio deve ser um número positivo'),
  [NationalMarketPricesTypes.Region]: yup
    .string()
    .required('A região é obrigatória'),
});

export default validationSchema;
