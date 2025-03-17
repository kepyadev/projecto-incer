import * as yup from 'yup';

import { User } from '../../../../../../../constants/user';
import { phoneRegex } from '../../../../../../../utils';

const validationSchema = yup.object().shape({
  [User.FirstName]: yup.string().required('O Primeiro nome é obrigatório'),
  [User.LastName]: yup.string().required('O Ultimo nome é obrigatório'),
  [User.Email]: yup
    .string()
    .required('O email é obrigatório ')
    .email('Por favor, indique um e-mail válido'),
  [User.Phone]: yup
    .string()
    .matches(
      phoneRegex,
      'Por favor insira um número Telefónico válido, Ex. 900111222'
    ),
});

export default validationSchema;
