import { useForm } from 'react-hook-form';
import PasswordInput from '../../components/auth/PasswordInput';
import CustomInput from '../../components/UI/FormInput';
import { loginInputFields } from '../../components/auth/loginInputFields';
import { useState } from 'react';
import { apiService } from '../../services/apiService';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = apiService.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
    } catch (error: any) {
      console.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-4 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Вхід в кабінет учня</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {loginInputFields.map((field) => (
          <CustomInput
            key={field.name}
            id={field.name}
            label={field.label}
            {...register(field.name as keyof LoginFormData, field.validation)}
            error={errors[field.name as keyof LoginFormData]?.message}
          />
        ))}

        <PasswordInput
          id="login-password"
          label="Пароль"
          {...register('password', {
            required: 'Пароль обов’язковий',
          })}
          error={errors.password?.message}
        />
        <div className="flex flex-col items-center">
          <button
            type="submit"
            disabled={loading}
            className="w-3/4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            {loading ? 'Завантаження...' : 'Увійти'}
          </button>
          <span className="mt-2">Забули пароль ?</span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
