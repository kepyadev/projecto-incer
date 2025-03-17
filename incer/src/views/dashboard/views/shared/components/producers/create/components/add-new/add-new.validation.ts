import * as yup from 'yup';

import { Producer } from '../../../../../../../../../constants/entities';
import { User } from '../../../../../../../../../constants/user';
import { phoneRegex } from '../../../../../../../../../utils';

// Regex patterns for different NIF types
const individualNIFPattern = /^\d{9}[A-Z]{2}\d{3}$/; // Format: 000181960LA019 (9 digits + 2 letters + 3 digits)
const companyNIFPattern = /^5\d{9}$/; // Format: 5401144440 (starts with 5 + 9 digits)
const foreignerNIFPattern = /^7\d{9}$/; // Format: 7XXXXXXXXX (starts with 7 + 9 digits)

const validationSchema = yup.object().shape({
  [Producer.CompanyName]: yup.string().when(Producer.isProducer, {
    is: 'business',
    then: yup.string().required('Nome da empresa é obrigatório'),
    otherwise: yup.string(),
  }),
  [Producer.Nif]: yup
    .string()
    .required('NIF é obrigatório')
    .test('nif-format', 'Formato de NIF inválido', function (value) {
      if (!value) return false;

      const { parent } = this;
      const producerType = parent[Producer.isProducer];

      // Mensagens de erro específicas para cada tipo
      const errorMessages = {
        single:
          'NIF individual deve seguir o formato: 9 dígitos + 2 letras + 3 dígitos (Ex: 000181960LA019)',
        business:
          'NIF empresarial deve começar com 5 e ter 10 dígitos no total (Ex: 5401144440)',
        foreign: 'NIF estrangeiro deve começar com 7 e ter 10 dígitos no total',
      };

      let isValid = false;

      switch (producerType) {
        case 'business':
          isValid = companyNIFPattern.test(value);
          if (!isValid) this.createError({ message: errorMessages.business });
          break;

        case 'foreign':
          isValid = foreignerNIFPattern.test(value);
          if (!isValid) this.createError({ message: errorMessages.foreign });
          break;

        case 'single':
          isValid = individualNIFPattern.test(value);
          if (!isValid) this.createError({ message: errorMessages.single });
          break;

        default:
          isValid = false;
      }

      return isValid;
    }),
  [User.FirstName]: yup.string().required('O Primeiro nome é obrigatório'),
  [User.LastName]: yup.string().required('O Segundo nome é obrigatório'),
  [User.Email]: yup
    .string()
    .email('Por favor, indique um e-mail válido')
    .required('O email é obrigatório'),
  [User.Phone]: yup
    .string()
    .matches(
      phoneRegex,
      'Por favor insira um número Telefónico válido, Ex. 900111222'
    ),
  // [Producer.Bi]: yup
  //   .string()
  //   .required('O número do bilhete é obrigatório')
  //   .matches(
  //     biRegex,
  //     'Por favor insira correctamento o númeo do bilhete de identidade'
  //   ),
  [Producer.isProducer]: yup
    .string()
    .oneOf(['single', 'business', 'foreign'], 'Tipo de produtor inválido')
    .required('Tipo de produtor é obrigatório'),
});

export default validationSchema;
