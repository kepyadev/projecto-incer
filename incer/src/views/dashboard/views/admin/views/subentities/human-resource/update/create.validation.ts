import * as yup from 'yup';

import { HumanResourceType } from '../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [HumanResourceType.Description]: yup
    .string()
    .required('A descrição é obrigatória'),
});

export default validationSchema;
