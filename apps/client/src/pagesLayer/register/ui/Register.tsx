'use client';

import { AuthFormWrapper, RegisterForm } from '@/features/auth/student';

export const RegisterPage = () => {
  return (
    <AuthFormWrapper title="Реєстрація">
      <RegisterForm />
    </AuthFormWrapper>
  );
};
