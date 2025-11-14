'use client';

import React from 'react';
import Image from 'next/image';
import RegisterForm from '@/components/features/auth/register-form'; 
import axios from 'axios';
import { RegisterFormData } from '@/types/auth';



export default function RegisterPage() {
  const handleRegister = async (data: RegisterFormData) => {
    console.log('Registration data:', data);
    
    try {
    //   const response = await axios.post('/api/auth/register', {
    //    firstName: data.firstName,
        // lastName: data.lastName,
        // email: data.email,
        // password: data.password,
    //   });
      
    //   if (response.ok) {
    //     const result = await response.json();
    //     // Handle successful registration (redirect, show message, etc.)
    //     console.log('Registration successful:', result);
    //   } else {
    //     // Handle error
    //     console.error('Registration failed');
    //   }

      // Handle successful registration
    //   console.log('Registration successful:', response.data);
      
      // Redirect to dashboard or login page
      // router.push('/dashboard');
      // or show success message
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle axios error
        console.error('Registration failed:', error.response?.data);
        
        // You can show error message to user
        const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
        alert(errorMessage); // Replace with your toast/notification system
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/*  - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image - Full and Clear */}
        <Image 
          className="w-full h-full object-cover"
          alt="Auth Image"
          src="/images/auth_image.png"
          fill
          priority
          quality={100}
          style={{
            objectFit: 'cover',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 xl:p-20 text-white w-full">
          {/* Top Section */}
          <div className="flex-1 flex items-center">
            <div className="max-w-lg border-amber-950 absolute top-20">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight drop-shadow-lg block text-center">
                Welcome to KAZI
              </h1>
              <p className="text-xl lg:text-2xl text-white leading-relaxed drop-shadow-md block text-center">
                Connecting you to endless possibilities.
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="max-w-lg block text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight drop-shadow-lg">
              Effortless Connections
            </h2>
            <p className="text-lg lg:text-xl text-white drop-shadow-md">
              Secure, fast, reliable.
            </p>
          </div>
        </div>
      </div>

      {/*- Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
           
          <RegisterForm onSubmit={handleRegister}  />
        </div>
      </div>

      {/* Mobile Header - Shows on mobile devices */}
      <div className="lg:hidden absolute top-0 left-0 right-0 p-6 text-center bg-gradient-to-b from-gray-900/10 to-transparent pointer-events-none">
        <h2 className="text-2xl font-bold text-gray-900">KAZI</h2>
      </div>
    </div>
  );
}