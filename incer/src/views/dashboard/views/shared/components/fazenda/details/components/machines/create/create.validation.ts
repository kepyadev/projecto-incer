import * as yup from 'yup';

import { Machine } from '../../../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [Machine.Quantity]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a quantidade')
    .min(1, 'A quantidade deve ser maior que 1.'),
  [Machine.Power]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a potência')
    .min(1, 'A quantidade deve ser maior que 1.'),
});

export default validationSchema;
