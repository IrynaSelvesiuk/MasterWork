import { FaChalkboardTeacher } from 'react-icons/fa';
import { ProfileSection } from './profile-section';
import { TeacherProfile } from '@/entities/teacher/model/teacher-entity';

interface Props {
  teacher: TeacherProfile;
}

export const TeacherAbout = ({ teacher }: Props) =>
  teacher.bio ? (
    <ProfileSection title="Про мене" icon={FaChalkboardTeacher}>
      <p className="whitespace-pre-line text-base">{teacher.bio}</p>
    </ProfileSection>
  ) : null;
