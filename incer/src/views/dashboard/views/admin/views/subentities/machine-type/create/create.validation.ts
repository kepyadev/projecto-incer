import * as yup from 'yup';

import { MachineType } from '../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [MachineType.Description]: yup.string().required('A descrição é obrigatória'),
});

export default validationSchema;
