'use client';

import { AuthFormWrapper, LoginForm } from '@/features/auth';

export const LoginPage = () => {
  return (
    <AuthFormWrapper title="Авторизація">
      <LoginForm />
    </AuthFormWrapper>
  );
};
