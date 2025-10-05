import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

interface TutorStatsProps {
  lessonsCount: number;
  studentsCount: number;
}

export const TutorStats = ({
  lessonsCount,
  studentsCount,
}: TutorStatsProps) => {
  return (
    <div className="mt-3 flex space-x-4 text-sm text-gray-600">
      <p className="flex items-center">
        <span className="font-semibold text-gray-800">{studentsCount}</span>
        <FaUserGraduate className="ml-1 text-green-500" /> учнів
      </p>
      <p className="flex items-center">
        <span className="font-semibold text-gray-800">{lessonsCount}</span>
        <FaChalkboardTeacher className="ml-1 text-green-500" /> уроків
      </p>
    </div>
  );
};
