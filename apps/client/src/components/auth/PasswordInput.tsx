import { FC, useState, forwardRef, InputHTMLAttributes } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const PasswordInput: FC<PasswordInputProps> = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ id, label, error, ...inputProps }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPasswordVisible ? 'text' : 'password'}
          ref={ref}
          {...inputProps}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {isPasswordVisible ? (
            <IoEyeOff className="w-5 h-5" />
          ) : (
            <IoEye className="w-5 h-5" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
