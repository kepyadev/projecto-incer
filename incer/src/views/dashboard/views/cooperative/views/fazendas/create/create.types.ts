import { IFazenda } from '../../../../../../../types/fazenda';

export interface FormStepProps {
  onNext?: () => void;
  onBack?: () => void;
  onClose?: () => void;
  fazenda?: IFazenda;
}
