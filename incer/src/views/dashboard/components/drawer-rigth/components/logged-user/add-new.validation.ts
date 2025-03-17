import * as yup from 'yup';

import { Producer } from '../../../../../../constants/entities';
import { User } from '../../../../../../constants/user';
import { phoneRegex } from '../../../../../../utils';

// Regex patterns for different NIF types
const validationSchema = yup.object().shape({
  [Producer.CompanyName]: yup.string().when(Producer.isProducer, {
    is: 'business',
    then: yup.string().required('Nome da empresa é obrigatório'),
    otherwise: yup.string(),
  }),
  [Producer.Nif]: yup.string().required('NIF é obrigatório'),
  [User.FirstName]: yup.string().required('O Primeiro nome é obrigatório'),
  [User.LastName]: yup.string().required('O Segundo nome é obrigatório'),
  [User.Email]: yup.string().email('Por favor, indique um e-mail válido'),
  [User.Phone]: yup
    .string()
    .matches(
      phoneRegex,
      'Por favor insira um número Telefónico válido, Ex. 900111222'
    ),
});

export default validationSchema;
