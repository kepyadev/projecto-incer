import * as yup from 'yup';

import { MeioEstacionarioType } from '../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [MeioEstacionarioType.Description]: yup
    .string()
    .required('A descrição é obrigatória'),
});

export default validationSchema;
