import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { LessonEvent } from '@/entities/teacher/hooks/useTeacherCalendar';

interface BookingDetailsModalProps {
  event: LessonEvent | null;
  onClose: () => void;
}

export function BookingDetailsModal({
  event,
  onClose,
}: BookingDetailsModalProps) {
  if (!event) return null;

  const { resource } = event;
  const student = resource.student.user;
  const isConfirmed = resource.status === 'confirmed';

  // Helper configuration for status labels and colors
  const statusConfig: Record<string, { label: string; className: string }> = {
    confirmed: {
      label: 'Підтверджено',
      className: 'bg-green-100 text-green-700',
    },
    pending: {
      label: 'Очікується',
      className: 'bg-yellow-100 text-yellow-700',
    },
    rejected: {
      label: 'Відхилено',
      className: 'bg-red-100 text-red-700',
    },
    cancelled: {
      label: 'Скасовано',
      className: 'bg-gray-100 text-gray-600',
    },
  };

  const currentStatus = statusConfig[resource.status] || {
    label: resource.status,
    className: 'bg-gray-100 text-gray-700',
  };

  return (
    // Simple Modal Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Stop propagation allows clicking inside modal without closing it */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Деталі уроку</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Status Badge */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Студент</p>
              <p className="font-semibold text-lg text-gray-900">
                {student.firstName} {student.lastName}
              </p>
              <p className="text-sm text-gray-400">{student.email}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${currentStatus.className}`}
            >
              {currentStatus.label}
            </span>
          </div>

          {/* Date & Time */}
          <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3 text-blue-800">
            <span className="text-2xl">🕒</span>
            <div>
              <p className="font-bold">
                {format(event.start, 'd MMMM yyyy', { locale: uk })}
              </p>
              <p className="text-sm opacity-80">
                {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
              </p>
            </div>
          </div>

          {/* Note (if exists) */}
          {resource.note && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Нотатка:</p>
              <p className="text-gray-700 italic text-sm bg-gray-50 p-2 rounded border border-gray-200">
                {resource.note}
              </p>
            </div>
          )}

          {/* Meeting Link - THE IMPORTANT PART */}
          {isConfirmed && resource.meetingLink ? (
            <div className="pt-2">
              <a
                href={resource.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-0.5"
              >
                📹 Приєднатися до Google Meet
              </a>
            </div>
          ) : isConfirmed ? (
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-sm text-gray-400 italic">
                Посилання ще генерується...
              </p>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}
