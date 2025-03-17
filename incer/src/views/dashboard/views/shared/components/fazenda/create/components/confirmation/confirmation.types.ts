import { SnackMessage } from '../../../../../../../../../hooks/use-async-state';
import { IFazenda } from '../../../../../../../../../types/fazenda';

export interface ConfirmationProps {
  onReset: () => void;
  setSnackMessage: (snackMessage: SnackMessage) => void;
  onClose: () => void;
  fazenda?: IFazenda;
}
