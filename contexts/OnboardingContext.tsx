// contexts/OnboardingContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the steps in the onboarding flow
export type OnboardingStep = 'register' | 'verify-email' | 'verify-code' | 'success';

// Define the context type
interface OnboardingContextType {
  currentStep: OnboardingStep;
  email: string;
  userId: string | null;
  setStep: (step: OnboardingStep) => void;
  setEmail: (email: string) => void;
  setUserId: (id: string) => void;
  resetOnboarding: () => void; 
}

// Create the context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Provider component
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('register');
  const [email, setEmailState] = useState<string>('');
  const [userId, setUserIdState] = useState<string | null>(null);

  const setStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const setEmail = (newEmail: string) => {
    setEmailState(newEmail);
  };

  const setUserId = (id: string) => {
    setUserIdState(id);
  };

  const resetOnboarding = () => {
    setCurrentStep('register');
    setEmailState('');
    setUserIdState(null);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        email,
        userId,
        setStep,
        setEmail,
        setUserId,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

// Custom hook to use the onboarding context
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}