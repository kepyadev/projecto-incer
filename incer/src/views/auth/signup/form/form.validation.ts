import * as yup from 'yup';

import { Cooperative, Producer } from '../../../../constants/entities';
import { User } from '../../../../constants/user';
import { UserRole } from '../../../../types/user';

// Regex patterns for different NIF types
/* const individualNIFPattern = /^\d{9}[A-Z]{2}\d{3}$/; // Format: 000181960LA019
const companyNIFPattern = /^5\d{9}$/; // Format: 5401144440
const foreignerNIFPattern = /^7\d{9}$/; // Format: 7XXXXXXXXX
 */
const validationSchema = yup.object().shape({
  [User.FirstName]: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),

  [User.LastName]: yup.string().when(User.Role, {
    is: UserRole.Producer,
    then: yup.string().required('Apelido é obrigatório'),
    otherwise: yup.string(),
  }),

  [Producer.CompanyName]: yup.string().when(Producer.isProducer, {
    is: 'business',
    then: yup.string().required('Nome da empresa é obrigatório'),
    otherwise: yup.string(),
  }),

  [Producer.Nif]: yup.string().required('NIF é obrigatório'),
  [User.Email]: yup.string().email('Email inválido').required('Email é obrigatório'),

  [User.Phone]: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/^\d{9}$/, 'Telefone deve ter 9 dígitos'),

  [User.Password]: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),

  [User.ConfirmPassword]: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref(User.Password)], 'As senhas devem ser iguais'),

  [Cooperative.Presindet]: yup.string().when(User.Role, {
    is: UserRole.Cooperative,
    then: yup.string().required('Nome do presidente é obrigatório'),
    otherwise: yup.string(),
  }),

  [Producer.isProducer]: yup
    .string()
    .oneOf(['single', 'business', 'foreign'], 'Tipo de produtor inválido'),
});

export default validationSchema;
