import * as yup from 'yup';

import { Infraestrutura } from '../../../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [Infraestrutura.Capacity]: yup
    .string()
    .required('Por favor indique a capacidade da infraestrutura'),
  [Infraestrutura.Quantity]: yup
    .number()
    .required('Por favor indique a quantidade')
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    ),
});

export default validationSchema;
