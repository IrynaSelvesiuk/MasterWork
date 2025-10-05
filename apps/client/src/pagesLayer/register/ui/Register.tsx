'use client';

import { AuthFormWrapper, RegisterForm } from '@/features/auth';

export const RegisterPage = () => {
  return (
    <AuthFormWrapper title="Реєстрація">
      <RegisterForm />
    </AuthFormWrapper>
  );
};
