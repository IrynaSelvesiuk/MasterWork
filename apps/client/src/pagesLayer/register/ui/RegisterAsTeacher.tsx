import { AuthFormWrapper } from '@/features/auth/student';
import TeacherRegisterForm from '@/features/auth/teacher/ui/TeacherRegisterForm';
import React from 'react';

const RegisterAsTeacher = () => {
  return (
    <AuthFormWrapper title="Реєстрація викладача">
      <TeacherRegisterForm />
    </AuthFormWrapper>
  );
};

export default RegisterAsTeacher;
