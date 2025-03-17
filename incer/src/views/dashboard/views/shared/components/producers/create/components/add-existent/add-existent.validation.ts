import * as yup from 'yup';

import { Producer } from '../../../../../../../../../constants/entities';

const validationSchema = yup.object().shape({
  [Producer.Id]: yup.string().required('O Código do produtor é obrigatório'),
});

export default validationSchema;
