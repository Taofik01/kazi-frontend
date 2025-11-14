export interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}