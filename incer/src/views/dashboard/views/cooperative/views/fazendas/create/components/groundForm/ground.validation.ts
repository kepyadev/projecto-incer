import * as yup from 'yup';

import { Ground } from '../../../../../../../../../constants/sub-entites';

const validationSchema = yup.object().shape({
  [Ground.extension]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('A altitude média é obrigatória')
    .min(50, 'O extensão mínima é de 50 ha'),
  [Ground.AltitudeMedia]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('A altitude média é obrigatória'),
  // [Ground.Orografia]: yup.string().required('A orografia é obrigatória'),
  [Ground.PropriedadesFisicas]: yup
    .string()
    .required('As propriedades físicas são obrigatórias'),
  [Ground.PhMedio]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .min(1, 'O valor mínimo para o PH médio é 1')
    .max(7, 'O valor máximo para o PH médio é 7'),
  [Ground.AreaCorrigida]: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('A area corrigida é obrigatória')
    .min(1, 'A area de corrigida deve ter no minímo 1HA'),
});

export default validationSchema;
