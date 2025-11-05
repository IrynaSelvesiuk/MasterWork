'use client';

import { StudentProfileCard } from './StudentProfileCard';
import { BecomeTutorSection } from './BecomeTutors';
import { StudentResponse } from '@/entities/student/model/student';

interface ProfileSidebarProps {
  student: StudentResponse;
}

export const ProfileSidebar = ({ student }: ProfileSidebarProps) => (
  <aside className="lg:col-span-1">
    <StudentProfileCard student={student} />
    <BecomeTutorSection />
  </aside>
);
