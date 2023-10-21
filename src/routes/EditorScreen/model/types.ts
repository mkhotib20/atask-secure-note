export interface UseHeaderOptions extends HeaderRightProps {}

export interface HeaderRightProps {
  onSave: () => void;
  isEdit?: boolean;
  onDelete: () => void;
}
