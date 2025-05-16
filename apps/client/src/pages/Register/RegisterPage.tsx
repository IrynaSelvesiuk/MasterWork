import { useForm } from 'react-hook-form';
import PasswordInput from '../../components/auth/PasswordInput';
import { apiService } from '../../services/apiService';
import { registerInputFields } from '../../components/auth/registerInputFields';
import FormInput from '../../components/UI/FormInput';
import { useState } from 'react';

interface RegisterFormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  subject: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      setLoading(true);

      const response = await apiService.post('/auth/register', {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        password: data.password,
      });
    } catch (error: any) {
      alert(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-4 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Реєстрація викладача</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {registerInputFields.map((field) => (
          <FormInput
            key={field.name}
            id={field.name}
            label={field.label}
            {...register(
              field.name as keyof RegisterFormData,
              field.validation
            )}
            error={errors[field.name as keyof RegisterFormData]?.message}
          />
        ))}

        <PasswordInput
          id="login-password"
          label="Пароль"
          {...register('password', {
            required: 'Пароль обов’язковий',
            minLength: {
              value: 6,
              message: 'Пароль має бути не менше 6 символів',
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/,
              message: 'Пароль має містити велику літеру, цифру та символ',
            },
          })}
          error={errors.password?.message}
        />
        <PasswordInput
          id="login-confirm-password"
          label="Повторіть пароль"
          {...register('confirmPassword', {
            required: 'Підтвердження пароля обов’язкове',
            validate: (value) => value === password || 'Паролі не збігаються',
          })}
          error={errors.confirmPassword?.message}
        />
        <div className="flex flex-col items-center">
          <button
            type="submit"
            disabled={loading}
            className="w-3/4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            {loading ? 'Завантаження...' : 'Зареєструватися'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
