import * as yup from 'yup';

import { User } from '../../../../constants/user';

const validationSchema = yup.object().shape({
  [User.Password]: yup
    .string()
    .required('A palavra passe é obrigatória')
    .min(4, 'A sua palavra passe deve ter um minimo de 4 caracteres'),
  [User.ConfirmPassword]: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'A palavra passe de confirmação não confere'
    ),
});
export default validationSchema;
