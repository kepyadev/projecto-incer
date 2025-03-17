import * as yup from 'yup';

import { emailRegex, phoneRegex } from '../../../../utils';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('O E-mail/Telefone é obrigatorio')
    .test('test-name', 'Introduza um E-mail/Telefoe válido', (value = '') => {
      const isValidEmail = emailRegex.test(value);
      const isValidPhone = phoneRegex.test(value);

      return isValidEmail || isValidPhone;
    }),
});
export default validationSchema;
