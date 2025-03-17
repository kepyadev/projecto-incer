import * as yup from 'yup';

import { Equipamento } from '../../../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [Equipamento.Quantity]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a quantidade')
    .min(1, 'A quantidade deve ser maior que 0'),
  [Equipamento.Caracteristicas]: yup
    .string()
    .required('Por favor indique as características'),
});

export default validationSchema;
