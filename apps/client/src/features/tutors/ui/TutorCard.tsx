'use client';

import { FaBriefcase, FaGlobe, FaMapMarkedAlt, FaStar } from 'react-icons/fa';
import { TutorBadge } from './TutorBadge';
import { TutorActions } from './TutorActions';
import { TeacherProfile } from '@/entities/teacher/model/teacher-entity';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/entities/user/model/store';
import { getAverageRating } from '@/shared/utils/getAverageRating';

interface Props {
  teacher: TeacherProfile;
  isNew?: boolean;
}

export const TutorCard = ({ teacher, isNew = false }: Props) => {
  const { user } = useAuthStore();
  const displayName = `${teacher.user.firstName} ${teacher.user.lastName}`;
  const subjectNames =
    teacher.subjects.map((s) => s.name).join(', ') || 'Немає';
  console.log(teacher);
  const isSelf = teacher.user.id === user?.id;
  console.log('User ROLE', user);
  const rating = getAverageRating(teacher.reviews);
  const reviewsCount = teacher.reviews.length;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition duration-300 flex space-x-5 relative">
      <div className="flex-shrink-0 flex flex-col items-center w-36">
        <div className="w-28 h-28 mb-3">
          <Link href={`/teacher-profile/${teacher.id}`}>
            <Image
              src={teacher.avatarUrl || '/placeholder-avatar.png'}
              alt={displayName}
              width={64}
              height={64}
              className="w-full h-full object-cover rounded-full border-4 border-green-500"
            />
          </Link>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <h3 className="text-xl font-bold text-gray-800">{displayName}</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1 flex items-center justify-center">
            <FaGlobe className="mr-1 text-green-500" />
            {subjectNames}
          </p>
          {location && (
            <p className="text-sm text-gray-500 mt-1 flex items-center justify-center">
              <FaMapMarkedAlt className="mr-1" />
              {teacher.location}
            </p>
          )}
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2 relative w-full">
            <TutorBadge isNew={isNew} />
          </div>

          <p className="text-gray-700 mt-2 ml-4 font-semibold">Про мене:</p>

          <p className="text-gray-700 mt-2 line-clamp-3 ml-4">
            {teacher.bio || teacher.headline || 'Немає опису'}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-3">
          {/* Experience */}
          <div className="flex items-center gap-2 text-sm text-gray-700 min-w-[90px]">
            <FaBriefcase className="text-gray-500" />
            <span className="font-medium">
              {teacher.yearsOfExperience ?? 0} р.
            </span>
            <span className="text-gray-500">досвіду</span>
          </div>

          {/* Rating */}
          {rating ? (
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-gray-500">({reviewsCount})</span>
            </span>
          ) : (
            <span className="text-gray-400">Новий</span>
          )}

          {/* Actions / Price */}
          <div className="flex justify-end min-w-[140px]">
            <TutorActions
              teacherRole={user?.role}
              teacherId={teacher.id}
              pricePer60Min={
                teacher.hourlyRate ? Number(teacher.hourlyRate) : 0
              }
              isSelf={isSelf}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
