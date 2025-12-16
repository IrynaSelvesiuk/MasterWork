'use client';

import { useBookedSlots } from '@/entities/booking/queries/useBookedSlots';
import { useBookLesson } from '@/entities/student/hooks/mutations/useBookLesson';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherId: string;
}

interface BookingForm {
  startTime: string;
  note?: string;
}

const getMinDateTime = () => {
  const now = new Date();
  now.setSeconds(0, 0); // remove seconds & ms
  return now.toISOString().slice(0, 16);
};

export const BookingModal = ({
  isOpen,
  onClose,
  teacherId,
}: BookingModalProps) => {
  const { register, handleSubmit, reset } = useForm<BookingForm>();
  const { mutate, isPending } = useBookLesson();
  const { data: bookedSlots = [] } = useBookedSlots(teacherId);

  const bookedMinutes = useMemo(() => {
    return new Set(
      bookedSlots.map((slot) => {
        const d = new Date(slot);
        d.setSeconds(0, 0); // drop seconds
        return d.getTime();
      })
    );
  }, [bookedSlots]);

  const onSubmit = (data: BookingForm) => {
    mutate(
      {
        teacherId,
        startTime: data.startTime,
        note: data.note,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          type="button"
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
              min={getMinDateTime()}
              {...register('startTime', {
                required: true,
                validate: (value) => {
                  const selected = new Date(value);
                  selected.setSeconds(0, 0);

                  return (
                    !bookedMinutes.has(selected.getTime()) ||
                    'Цей час вже заброньований'
                  );
                },
              })}
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
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-70"
              disabled={isPending}
            >
              {isPending ? 'Підтверджуємо...' : 'Підтвердити'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
