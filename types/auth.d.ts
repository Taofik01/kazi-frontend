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

export interface VerifyEmailData {
  email: string;
}

export interface VerifyCodeData {
  code: string;
}

export interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  userId: string | null;
  setStep: (step: OnboardingStep) => void;
  setEmail: (email: string) => void;
  setUserId: (userId: string) => void;
  resetOnboarding: () => void;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export type OnboardingStep = 'register' | 'verifyEmail' | 'verifyCode' | 'completeProfile';
