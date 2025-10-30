'use client';

import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  Controller,
} from 'react-hook-form';
import Select from 'react-select';
import { useMemo } from 'react';

const useGetLanguages = () => ({
  data: [
    { id: '1', name: 'Українська' },
    { id: '2', name: 'Англійська' },
    { id: '3', name: 'Польська' },
    { id: '4', name: 'Німецька' },
  ],
  isLoading: false,
  isError: false,
});

type LanguageOption = {
  value: string;
  label: string;
};

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
}

export const ChooseLanguagesInput = <T extends FieldValues>({
  label,
  name,
  control,
  errors,
}: Props<T>) => {
  const { data: languages, isLoading, isError } = useGetLanguages();

  const options = useMemo(
    () =>
      languages
        ? languages
            .map((language) => ({
              value: language.id,
              label: language.name,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
        : [],
    [languages]
  );

  const fieldError = errors && errors[name];

  if (isError) {
    return (
      <div className="mb-4 text-red-500">Не вдалося завантажити мови.</div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: 'Будь ласка, оберіть хоча б одну мову',
        }}
        render={({ field }) => {
          const selectedValue = options.filter((option) =>
            field.value?.includes(option.value)
          );

          const handleChange = (selectedOptions: readonly LanguageOption[]) => {
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
              placeholder="Оберіть мови, якими володієте..."
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
