export interface IConfirmDeleteModalProps {
  fruitName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}
