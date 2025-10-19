import {
  ArrayPath,
  Control,
  FieldErrors,
  FieldValues,
  Path,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';

type FormValuesWithArray = FieldValues;

interface Props<T extends FormValuesWithArray> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}

const ChooseSubjectsInput = <T extends FormValuesWithArray>({
  label,
  name,
  control,
  register,
  errors,
}: Props<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as ArrayPath<T>,
  });

  const fieldErrors = errors && errors[name];

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            {...register(`${name}.${index}` as Path<T>)}
            className={`w-full px-2 py-1 border rounded ${
              fieldErrors ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append('' as T[typeof name][number])}
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add {label.slice(0, -1)}
      </button>

      {errors && errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default ChooseSubjectsInput;
