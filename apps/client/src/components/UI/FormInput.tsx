import { forwardRef, HTMLProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends HTMLProps<HTMLInputElement> {
  id: string;
  label: string;
  register?: UseFormRegisterReturn;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, register, error, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          {...rest}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default FormInput;
