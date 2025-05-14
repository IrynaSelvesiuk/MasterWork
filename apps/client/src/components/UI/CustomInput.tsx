interface CustomInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ id, label, type }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default CustomInput;
