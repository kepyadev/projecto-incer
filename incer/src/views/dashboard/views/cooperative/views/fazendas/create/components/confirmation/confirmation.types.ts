import { IFazenda } from '../../../../../../../../../types/fazenda';

export interface ConfirmationProps {
  onReset: () => void;
  onClose: () => void;
  fazenda?: IFazenda;
}
