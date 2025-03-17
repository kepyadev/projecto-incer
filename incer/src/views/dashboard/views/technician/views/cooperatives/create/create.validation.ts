import * as yup from 'yup';

import { Cooperative } from '../../../../../../../constants/entities';
import { phoneRegex } from '../../../../../../../utils';

const companyNIFPattern = /^5\d{9}$/; // Format: 5401144440

const validationSchema = yup.object().shape({
  [Cooperative.Description]: yup.string().required('O Nome é obrigatório'),
  [Cooperative.Email]: yup
    .string()
    .email('Por favor, indique um e-mail válido')
    .required('Por favor, o email é um campo obrigatório'),
  [Cooperative.Phone]: yup
    .string()
    .matches(
      phoneRegex,
      'Por favor insira um número Telefónico válido, Ex. 900111222'
    )
    .required('Por favor, indique o número de telefone'),
  [Cooperative.Nif]: yup
    .string()
    .required('O Nif é obrigatório')
    .matches(companyNIFPattern, 'NIF inválido'),

  [Cooperative.Address]: yup.string().required('Por favor, indique o endereço'),
  [Cooperative.Presindet]: yup
    .string()
    .required('Por favor, indique o nome do presidente'),
  [Cooperative.isCooperative]: yup
    .string()
    .oneOf(['cooperative', 'assoc'], 'Tipo de entidade inválido')
    .required('Tipo de entidade é obrigatório'),
});

export default validationSchema;
