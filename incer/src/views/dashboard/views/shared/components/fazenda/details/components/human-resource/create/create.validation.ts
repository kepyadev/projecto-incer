import * as yup from 'yup';

import { HumanResource } from '../../../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [HumanResource.Quantity]: yup
    .number()
    .transform(
      (value, originalValue) => (originalValue === '' ? undefined : value) // Trata strings vazias como `undefined`
    )
    .required('Por favor indique a quantidade'),
});

export default validationSchema;
