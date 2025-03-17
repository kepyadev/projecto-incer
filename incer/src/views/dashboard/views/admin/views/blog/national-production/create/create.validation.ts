import * as yup from 'yup';

import { NationalProductionType } from '../../../../../../../../constants/entities';

const validationSchema = yup.object().shape({
  [NationalProductionType.Product]: yup.string().required('O produto é obrigatório'),
  [NationalProductionType.Year]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('O ano é obrigatório')
    .positive('O ano deve ser um número positivo')
    .integer('O ano deve ser um número inteiro')
    .min(1990, 'A quantidade deve ser maior que 1990.'),

  [NationalProductionType.QuantityProduced]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('A quantidade produzida é obrigatória')
    .positive('A quantidade produzida deve ser um número positivo')
    .min(1, 'A quantidade deve ser maior que 1.'),

  [NationalProductionType.AveragePrice]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('O preço médio é obrigatório')
    .positive('O preço médio deve ser um número positivo')
    .min(1, 'A quantidade deve ser maior que 1.'),

  [NationalProductionType.Region]: yup.string().required('A região é obrigatória'),
});

export default validationSchema;
