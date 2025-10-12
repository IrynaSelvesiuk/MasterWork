'use client';

import { User } from '@/entities/user';
import { StudentProfileCard } from './StudentProfileCard';
import { ProfileNavigation } from './ProfileNavigation';
import { BecomeTutorSection } from './BecomeTutors';

interface ProfileSidebarProps {
  user: User;
}

export const ProfileSidebar = ({ user }: ProfileSidebarProps) => (
  <aside className="lg:col-span-1">
    <StudentProfileCard user={user} />
    <ProfileNavigation />
    <BecomeTutorSection />
  </aside>
);
