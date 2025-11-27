'use client';

import { useBookLesson } from '@/entities/student/hooks/mutations/useBookLesson';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface TutorActionsProps {
  pricePer60Min: number;
  teacherId: string;
  isSelf: boolean;
}

interface BookingForm {
  date: string;
  note?: string;
}

export const TutorActions = ({
  pricePer60Min,
  teacherId,
  isSelf,
}: TutorActionsProps) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<BookingForm>();
  const { mutate, isPending } = useBookLesson();

  const onSubmit = async (data: BookingForm) => {
    mutate(
      {
        teacherId,
        date: data.date,
        note: data.note,
      },
      {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100 relative">
      <div className="text-right mr-6">
        <div className="text-sm text-gray-500">1 год/заняття</div>
        <div className="text-3xl font-extrabold text-green-600">
          {pricePer60Min.toLocaleString('uk-UA', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}{' '}
          ₴
        </div>
      </div>

      {/* Book button */}
      <button
        onClick={() => setOpen(true)}
        disabled={isSelf}
        className={`
    font-semibold py-3 px-6 rounded-xl transition shadow-md 
    ${
      isSelf
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
    }
  `}
      >
        Забронювати пробний урок
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Забронювати пробний урок
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Оберіть дату і час
                </label>
                <input
                  type="datetime-local"
                  {...register('date', { required: true })}
                  className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Коментар (необов&apos;язково)
                </label>
                <textarea
                  {...register('note')}
                  className="border rounded-lg p-2 w-full resize-none h-20 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
                  disabled={isPending}
                >
                  {isPending ? 'Підтверджуємо...' : 'Підтвердити'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
