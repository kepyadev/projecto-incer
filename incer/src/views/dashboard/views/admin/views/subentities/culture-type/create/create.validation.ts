import * as yup from 'yup';

import { CultureType } from '../../../../../../../../constants/entities';

const validationSchema = yup.object().shape({
  [CultureType.Description]: yup.string().required('A descrição é obrigatória'),
});

export default validationSchema;
