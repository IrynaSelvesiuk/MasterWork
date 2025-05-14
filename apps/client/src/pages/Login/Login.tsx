import { useForm } from 'react-hook-form';
import PasswordInput from '../../components/auth/PasswordInput';
import CustomInput from '../../components/UI/CustomInput';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log('Form submitted with:', data);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Вхід в кабінет учня</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput id="login-email" label="Адреса електронної пошти" />

        <PasswordInput id="login-password" label="Пароль" />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Увійти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
