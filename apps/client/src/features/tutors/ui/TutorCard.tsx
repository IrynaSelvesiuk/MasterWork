'use client';

import {
  FaHeart,
  FaGlobe,
  FaUserGraduate,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import { TutorBadge } from './TutorBadge';
import { TutorActions } from './TutorActions';
import { TutorStats } from './TutorStats';

interface TutorCardProps {
  name: string;
  image: string;
  languages: string[];
  pricePer50Min: number;
  lessonsCount: number;
  studentsCount: number;
  isNew?: boolean;
  description: string;
}

export const TutorCard = ({
  name,
  image,
  languages,
  pricePer50Min,
  lessonsCount,
  studentsCount,
  isNew = false,
  description,
}: TutorCardProps) => {
  const flag = name.includes('Amelia')
    ? '🇬🇧'
    : name.includes('Ivan')
      ? '🇺🇦'
      : '🇺🇸';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition duration-300 flex space-x-5 relative">
      {/* Tutor Profile Section */}
      <div className="flex-shrink-0 flex flex-col items-center w-36">
        <div className="w-28 h-28 mb-3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-full border-4 border-green-500"
          />
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <span className="text-xl">{flag}</span>
          </div>
          <p className="text-sm text-gray-600 flex items-center justify-center mt-1">
            <FaGlobe className="mr-1 text-green-500" />
            Мови: {languages[0]} (Рідна)
          </p>
        </div>
      </div>

      {/* Description and Stats */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2 relative w-full">
            <TutorBadge isNew={isNew} />

            <button className="text-gray-400 hover:text-red-500 transition absolute right-0">
              <FaHeart className="w-6 h-6" />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-700 mt-2 line-clamp-3 ml-4">{description}</p>
          {/* Stats Component */}
          <TutorStats
            lessonsCount={lessonsCount}
            studentsCount={studentsCount}
          />
        </div>

        {/* Price and Action Buttons */}
        <TutorActions pricePer60Min={pricePer50Min} />
      </div>
    </div>
  );
};
