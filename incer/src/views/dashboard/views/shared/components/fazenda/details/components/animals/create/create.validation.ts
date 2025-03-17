import * as yup from 'yup';

import { Animal } from '../../../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [Animal.EfectivoTotal]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique o seu efectivo total'),
  [Animal.Matrizes]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a quantidade de matrizes'),
  [Animal.ProducaoAnual]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a produção anual'),
  [Animal.AnoProducao]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .min(2010, 'Lamentamos, apenas são aceites anos superior a 2009')
    .max(2040, 'Lamentamos, apenas são aceites anos a 2040')
    .required('Por favor indique o ano de produção'),
  [Animal.QuantidadeOvos]: yup.number(),
});

export default validationSchema;
