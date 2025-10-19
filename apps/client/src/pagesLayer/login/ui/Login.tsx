'use client';

import { AuthFormWrapper, LoginForm } from '@/features/auth/student';

export const LoginPage = () => {
  return (
    <AuthFormWrapper title="Авторизація">
      <LoginForm />
    </AuthFormWrapper>
  );
};
