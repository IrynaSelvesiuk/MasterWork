'use client';

interface TutorBadgesProps {
  isNew?: boolean;
}

export const TutorBadge = ({ isNew = false }: TutorBadgesProps) => {
  return (
    <div className="flex space-x-2">
      {isNew && (
        <span className="text-xs bg-lime-100 text-lime-700 px-3 py-1 rounded-full font-semibold">
          Новий
        </span>
      )}
    </div>
  );
};
