import { SnackMessage } from '../../hooks/use-async-state';

export enum SnackType {
  Error = 'error',
  SUccess = 'success',
  Alert = 'warning',
}
export interface SnackMessageProps {
  handleClose: () => void;
  snackMessage: SnackMessage | null;
}
