import { FC, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

interface PasswordInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ id, label, type }) => {
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
          type={isPasswordVisible ? 'text' : 'password'}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
};

export default PasswordInput;
