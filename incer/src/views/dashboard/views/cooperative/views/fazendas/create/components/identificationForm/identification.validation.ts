import * as yup from 'yup';

import { Fazenda } from '../../../../../../../../../constants/entities';
import { ContactInformation } from '../../../../../../../../../constants/sub-entites';
import { phoneRegex } from '../../../../../../../../../utils';

const companyNIFPattern = /^5\d{9}$/; // Format: 5401144440

const validationSchema = yup.object().shape({
  [Fazenda.Descricao]: yup.string().required('A descrição é obrigatória'),
  [Fazenda.Nif]: yup
    .string()
    .required('O Nif é obrigatório')
    .matches(companyNIFPattern, 'NIF inválido'),

  [ContactInformation.Phone]: yup
    .string()
    .matches(
      phoneRegex,
      'Por favor insira um número Telefónico válido, Ex. 900111222'
    )
    .required(),
  [Fazenda.Gerencia]: yup.string().required('Por favor indique o gerente'),
  [ContactInformation.Email]: yup
    .string()
    .required('O E-mail é obrigatório')
    .email('Por favor insira um e-mail válido'),
});

export default validationSchema;
