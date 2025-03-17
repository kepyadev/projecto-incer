import * as yup from 'yup';

import { ImportedProductsTypes } from '../../../../../../../../constants/entities';

const validationSchema = yup.object().shape({
  [ImportedProductsTypes.Product]: yup.string().required('O produto é obrigatório'),
  [ImportedProductsTypes.Year]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('O ano é obrigatório')
    .positive('O ano deve ser um número positivo')
    .integer('O ano deve ser um número inteiro')
    .min(1990, 'O ano deve ser maior que 1990.')
    .default(new Date().getFullYear()),
  [ImportedProductsTypes.OriginCountry]: yup
    .string()
    .required('O país de origem é obrigatório'),
  [ImportedProductsTypes.QuantityImported]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('A quantidade importada é obrigatória')
    .positive('A quantidade importada deve ser um número positivo')
    .min(1, 'A quantidade deve ser maior que 1.'),
  [ImportedProductsTypes.MarketPrice]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('O preço de mercado é obrigatório')
    .positive('O preço de mercado deve ser um número positivo')
    .min(1, 'A quantidade deve ser maior que 1.'),
});

export default validationSchema;
