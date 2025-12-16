'use client';

import { TeacherProfile } from '@/entities/teacher/model/teacher-entity';
import { BookingButton } from './booking-button';
import { useAuthStore } from '@/entities/user/model/store';

interface Props {
  teacher: TeacherProfile;
}

export const TeacherSidebar = ({ teacher }: Props) => {
  const { user } = useAuthStore();

  return (
    <div className="sticky top-8 space-y-6">
      <div className="rounded-xl border bg-white p-7 shadow-lg">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">
            {Math.round(teacher.hourlyRate)} ₴
          </span>
          <span className="text-gray-500">/ година</span>
        </div>

        {user?.id !== teacher.user.id && (
          <BookingButton teacherUserId={teacher.user.id} />
        )}
      </div>
    </div>
  );
};
