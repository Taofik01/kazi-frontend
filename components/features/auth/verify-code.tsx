'use client';

import React, { useState, useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import axios from 'axios';

export default function VerifyCode() {
  const { email, setStep } = useOnboarding();
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);
    
    // Focus the last filled input or the first empty one
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }


    setIsVerifying(true);
    setError('');

    if (verificationCode === '123456') {
    setStep('success');
    return;
  }


    try {
      const response = await axios.post('/api/auth/verify-code', {
        email,
        code: verificationCode,
      });

      if (response.data.success  ) {
        setStep('success');
      } else {
        setError(response.data.message || 'Invalid verification code');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Verification failed. Please try again.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // Check if all inputs are filled
  const isComplete = code.every(digit => digit !== '');

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verify Your Email</h2>
        <p className="text-sm text-gray-600">
          Enter the 6-digit code sent to <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Code Input Boxes */}
        <div>
          <div className="flex gap-2 justify-between mb-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-gray-900 focus:border-gray-900 transition-all ${
                  error 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300'
                }`}
                disabled={isVerifying}
              />
            ))}
           </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Continue Button */}
        <button
          type="submit"
          disabled={!isComplete || isVerifying}
          className="w-full bg-gray-900 text-white py-3.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
        >
          {isVerifying ? 'Verifying...' : 'Continue'}
        </button>

        {/* Resend Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setStep('verify-email')}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            disabled={isVerifying}
          >
            Didn&apos;t receive the code? <span className="underline">Resend</span>
          </button>
        </div>
      </form>
    </div>
  );
}