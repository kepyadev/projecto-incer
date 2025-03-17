import * as yup from 'yup';

import { AnimalType } from '../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [AnimalType.Description]: yup.string().required('A descrição é obrigatória'),
});

export default validationSchema;
