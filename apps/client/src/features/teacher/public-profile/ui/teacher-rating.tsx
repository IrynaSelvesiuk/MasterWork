'use client';

import { FaStar } from 'react-icons/fa';
import { ReviewSection } from '@/features/review-section/ui/review-section';
import { TeacherProfile } from '@/entities/teacher/model/teacher-entity';
import { useAuthStore } from '@/entities/user/model/store';

interface Props {
  teacher: TeacherProfile;
}

export const TeacherRating = ({ teacher }: Props) => {
  const { user } = useAuthStore();
  const isSelf = teacher.user.id === user?.id;

  return (
    <div className="mt-5 border-gray-200 border-t pt-5">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <FaStar className="h-6 w-6 text-yellow-400" />
          <span className="text-xl font-bold text-gray-800">
            {teacher?.reviews[0]?.rating || 0}
          </span>
        </div>

        <span className="text-lg text-gray-600">
          ({teacher.reviewsCount ?? 0} відгуків)
        </span>
      </div>

      <ReviewSection isSelf={isSelf} teacherId={teacher.id} />
    </div>
  );
};
