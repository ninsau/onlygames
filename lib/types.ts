export interface State {
  gridContent: string[][];
  currentRow: number;
  currentCell: number;
  gameOver: boolean;
  submittedRows: boolean[];
}

export interface Action {
  type: string;
  letter?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
