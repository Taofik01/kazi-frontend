'use client';

import { useOnboarding } from '@/contexts/OnboardingContext';

export function StepTester() {
  const { currentStep, setStep, setEmail, email } = useOnboarding();
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleSetStep = (step: 'register' | 'verify-email' | 'verify-code' | 'success') => {
    // Set a test email if switching to verify or success steps
    if ((step === 'verify-code' || step === 'verify-email' || step === 'success') && !email) {
      setEmail('test@example.com');
    }
    setStep(step);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-4 z-50">
      <p className="text-xs font-semibold text-gray-700 mb-2">🔧 Dev Tools</p>
      <p className="text-xs text-gray-500 mb-2">Current: {currentStep}</p>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleSetStep('register')}
          className={`px-3 py-2 text-xs rounded font-medium transition-colors ${
            currentStep === 'register'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Register
        </button>
        <button
          onClick={() => handleSetStep('verify-code')}
          className={`px-3 py-2 text-xs rounded font-medium transition-colors ${
            currentStep === 'verify-code' || currentStep === 'verify-email'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Verify Code
        </button>
        <button
          onClick={() => handleSetStep('success')}
          className={`px-3 py-2 text-xs rounded font-medium transition-colors ${
            currentStep === 'success'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Success
        </button>
      </div>
    </div>
  );
}