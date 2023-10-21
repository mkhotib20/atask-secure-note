export interface PasswordInputProps {
  isPasswordStrong: boolean;
  loading: boolean;
  pwd: string;
  setPwd: (text: string) => void;
  handlePressLogin: () => void;
}
