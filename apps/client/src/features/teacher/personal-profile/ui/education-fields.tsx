'use client';

import React from 'react';
import {
  useFieldArray,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { TeacherProfileFormSchema } from '@/entities/teacher';

interface Props {
  control: Control<TeacherProfileFormSchema>;
  register: UseFormRegister<TeacherProfileFormSchema>;
  errors: FieldErrors<TeacherProfileFormSchema>;
}

export const EducationFields = ({ control, register }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Освіта</h3>
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="grid grid-cols-3 gap-4 rounded border p-4"
        >
          <input
            {...register(`education.${index}.degree`)}
            placeholder="Ступінь (напр. Магістр)"
            className="col-span-3 rounded border p-2"
          />
          <input
            {...register(`education.${index}.university`)}
            placeholder="Навчальний заклад"
            className="col-span-2 rounded border p-2"
          />
          <input
            {...register(`education.${index}.years`)}
            placeholder="Роки (напр. 2010-2015)"
            className="col-span-1 rounded border p-2"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="col-span-3 text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <FaTrash /> Видалити запис
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ degree: '', university: '', years: '' })}
        className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
      >
        <FaPlus /> Додати освіту
      </button>
    </div>
  );
};
