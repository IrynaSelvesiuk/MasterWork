import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  Controller,
} from 'react-hook-form';
import Select from 'react-select';
import { useMemo } from 'react';
import { useGetSubjects } from '../teacher/hooks/useGetSubjects';

type SubjectOption = {
  value: string;
  label: string;
};

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
}

const ChooseSubjectsInput = <T extends FieldValues>({
  label,
  name,
  control,
  errors,
}: Props<T>) => {
  const { data: subjects, isLoading, isError } = useGetSubjects();

  const options = useMemo(
    () =>
      subjects
        ? subjects
            .map((subject) => ({
              value: subject.id,
              label: subject.name,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
        : [],
    [subjects]
  );

  const fieldError = errors && errors[name];

  if (isError) {
    return (
      <div className="mb-4 text-red-500">Не вдалося завантажити предмети.</div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: 'Будь ласка, оберіть хоча б один предмет',
          validate: (selectedIds: string[]) =>
            selectedIds.length <= 5 || 'Ви можете обрати до 5 предметів',
        }}
        render={({ field }) => {
          const selectedValue = options.filter((option) =>
            field.value?.includes(option.value)
          );

          const handleChange = (selectedOptions: readonly SubjectOption[]) => {
            field.onChange(selectedOptions.map((option) => option.value));
          };

          return (
            <Select
              {...field}
              value={selectedValue}
              onChange={handleChange}
              options={options}
              isMulti
              isLoading={isLoading}
              placeholder="Оберіть предмети..."
              closeMenuOnSelect={false}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: fieldError ? 'rgb(239 68 68)' : '#cbd5e1',
                }),
              }}
            />
          );
        }}
      />

      {fieldError && (
        <p className="text-red-500 text-sm mt-1">
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
};

export default ChooseSubjectsInput;
