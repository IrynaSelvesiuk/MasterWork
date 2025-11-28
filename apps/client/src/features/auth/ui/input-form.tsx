import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
}

const InputForm: React.FC<Props> = ({
  label,
  type = 'text',
  register,
  error,
  required = false,
}) => {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label} {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <input
        type={type}
        {...register}
        className={`w-full px-3 py-2 border rounded ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputForm;
