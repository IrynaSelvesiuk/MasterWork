'use client';

import { TeacherProfile } from '@/entities/teacher/model/teacher-entity';
import { BookingButton } from './booking-button';
import { Role } from '@/shared/enums/role.enum';

interface Props {
  teacher: TeacherProfile;
}

export const TeacherSidebar = ({ teacher }: Props) => {
  return (
    <div className="sticky top-8 space-y-6">
      <div className="rounded-xl border bg-white p-7 shadow-lg">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">
            {Math.round(teacher.hourlyRate)} ₴
          </span>
          <span className="text-gray-500">/ година</span>
        </div>

        {!teacher.user.role.includes(Role.Teacher) && (
          <BookingButton teacherUserId={teacher.id} />
        )}
      </div>
    </div>
  );
};
