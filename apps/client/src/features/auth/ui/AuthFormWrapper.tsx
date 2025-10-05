'use client';

import { ReactNode } from 'react';
import { GiOpenBook } from 'react-icons/gi';

interface AuthWrapperProps {
  title: string;
  children: ReactNode;
}

export const AuthFormWrapper = ({ title, children }: AuthWrapperProps) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          'linear-gradient(180deg, #e8f5e9 0%, #f1faf1 50%, #ffffff 100%)',
      }}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <GiOpenBook size={40} className="text-green-700" />
          <h1 className="text-3xl font-bold text-green-700 mt-2">{title}</h1>
        </div>

        {children}
      </div>
    </div>
  );
};
