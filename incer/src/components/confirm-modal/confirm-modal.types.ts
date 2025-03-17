export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  text: string;
  action: () => any;
}
