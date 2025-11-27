import { Experience } from '@/entities/teacher/model/teacher-entity';
import { ProfileSection } from '@/features/teacher/public-profile/ui/profile-section';
import { FaBriefcase } from 'react-icons/fa';

interface Props {
  experience: Experience[];
}

export const TeacherExperience = ({ experience }: Props) => {
  return (
    <ProfileSection title="Досвід роботи" icon={FaBriefcase}>
      {experience.length > 0 ? (
        <ul className="space-y-5">
          {experience.map((exp) => (
            <li key={exp.id}>
              <p className="font-semibold text-gray-900">{exp.role}</p>
              <p className="text-gray-600">{exp.location}</p>
              <p className="text-sm text-gray-500">{exp.years}</p>

              {exp.description && (
                <p className="mt-1 text-gray-700">{exp.description}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Дані про досвід роботи ще не додані.</p>
      )}
    </ProfileSection>
  );
};
