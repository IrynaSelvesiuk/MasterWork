import { Education } from '@/entities/teacher/model/teacher-entity';
import { ProfileSection } from '@/features/teacher/public-profile/ui/profile-section';
import { FaGraduationCap } from 'react-icons/fa';

interface Props {
  education: Education[];
}

export const TeacherEducation = ({ education }: Props) => {
  return (
    <ProfileSection title="Освіта" icon={FaGraduationCap}>
      {education.length > 0 ? (
        <ul className="space-y-5">
          {education.map((edu) => (
            <li key={edu.id}>
              <p className="font-semibold text-gray-900">{edu.degree}</p>
              <p className="text-gray-600">{edu.university}</p>
              <p className="text-sm text-gray-500">{edu.years}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Дані про освіту ще не додані.</p>
      )}
    </ProfileSection>
  );
};
