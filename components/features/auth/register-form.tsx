import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => Promise<void>;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [signInData, setSignInData] = useState<SignInFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [signInError, setSignInError] = useState('');

  const passwordValidations = {
    hasMinLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordValidations).every(Boolean);
  const doPasswordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const isSignUpFormValid = 
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    isPasswordValid &&
    doPasswordsMatch &&
    formData.agreeToTerms;

  const isSignInFormValid = 
    signInData.email.trim() !== '' &&
    signInData.password.trim() !== '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignInData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setSignInError('');
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignUpFormValid || isLoading) return;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignInFormValid || isLoading) return;

    setIsLoading(true);
    setSignInError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Example: Check credentials (replace with actual API call)
      console.log('Sign in data:', signInData);
      
      // If credentials are wrong, set error
      // setSignInError('Wrong password!');
    } catch (error) {
      console.error('Sign in error:', error);
      setSignInError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      {/* Logo */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-wider">KAZI</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab('signup')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'signup'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          } rounded-lg border-2 ${
            activeTab === 'signup' ? 'border-gray-900' : 'border-gray-200'
          }`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setActiveTab('signin')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'signin'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          } rounded-lg border-2 ${
            activeTab === 'signin' ? 'border-gray-900' : 'border-gray-200'
          }`}
        >
          Sign In
        </button>
      </div>

      {activeTab === 'signup' ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
              disabled={isLoading}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="johndoe@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handlePasswordBlur}
                placeholder="asdfd12$A"
                className="w-full px-4 py-3 pr-12 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Validations */}
            {passwordTouched && formData.password && (
              <div className="mt-3 space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className={passwordValidations.hasMinLength ? 'text-green-600' : 'text-red-600'}>
                    {passwordValidations.hasMinLength ? '✓' : '✗'}
                  </span>
                  <span className={passwordValidations.hasMinLength ? 'text-green-600' : 'text-red-600'}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={passwordValidations.hasUppercase ? 'text-green-600' : 'text-red-600'}>
                    {passwordValidations.hasUppercase ? '✓' : '✗'}
                  </span>
                  <span className={passwordValidations.hasUppercase ? 'text-green-600' : 'text-red-600'}>
                    Includes one uppercase
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={passwordValidations.hasNumber ? 'text-green-600' : 'text-red-600'}>
                    {passwordValidations.hasNumber ? '✓' : '✗'}
                  </span>
                  <span className={passwordValidations.hasNumber ? 'text-green-600' : 'text-red-600'}>
                    Includes one number
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={passwordValidations.hasSymbol ? 'text-green-600' : 'text-red-600'}>
                    {passwordValidations.hasSymbol ? '✓' : '✗'}
                  </span>
                  <span className={passwordValidations.hasSymbol ? 'text-green-600' : 'text-red-600'}>
                    Includes one symbol
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="asdfd12$A"
                className="w-full px-4 py-3 pr-12 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && !doPasswordsMatch && (
              <p className="mt-2 text-xs text-red-600">Passwords do not match</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={isLoading}
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
              I agree to{' '}
              <a href="#" className="text-blue-600 hover:underline">
                terms & conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              isSignUpFormValid && !isLoading
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isSignUpFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignInSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={signInData.email}
              onChange={handleSignInChange}
              placeholder="johndoe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showSignInPassword ? 'text' : 'password'}
                name="password"
                value={signInData.password}
                onChange={handleSignInChange}
                placeholder="12344"
                className={`w-full px-4 py-3 pr-12 border text-black rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition ${
                  signInError ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowSignInPassword(!showSignInPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showSignInPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {signInError && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <span className="text-red-600">⚠</span> {signInError}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={signInData.rememberMe}
                onChange={handleSignInChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-gray-900 hover:underline font-medium">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              isSignInFormValid && !isLoading
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isSignInFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Signing In...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;