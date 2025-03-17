import * as yup from 'yup';

import { MeioEstacionario } from '../../../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [MeioEstacionario.Quantity]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a quantidade')
    .min(1, 'A quantidade deve ser maior que 1.'),
  [MeioEstacionario.PowerValue]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a potência')
    .min(1, 'A quantidade deve ser maior que 1.'),
});

export default validationSchema;
