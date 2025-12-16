import { TeacherProfile } from '@/entities/teacher/model/teacher-entity';
import Image from 'next/image';

interface Props {
  teacher: TeacherProfile;
}

export const TeacherHeader = ({ teacher }: Props) => (
  <div className="rounded-xl border bg-white p-8 shadow-lg">
    <div className="flex flex-col-reverse sm:flex-row justify-between items-start">
      <div>
        <h1 className="text-4xl font-bold">{teacher.name}</h1>
        <p className="text-lg text-gray-600 mt-3">{teacher.headline}</p>
      </div>

      <div className="w-24 h-24 relative rounded-full overflow-hidden border-4 border-white shadow-md">
        <Image
          src={teacher.avatarUrl || '/default-avatar.png'}
          alt={teacher.name || 'teacher-name'}
          fill
          className="object-cover"
        />
      </div>
    </div>
  </div>
);
