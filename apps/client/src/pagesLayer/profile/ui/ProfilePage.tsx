import { ProfileMainContent } from './ProfileMainContent';
import { User } from '@/entities/user';
import { ProfileSidebar } from './ProfileSidebar';

const user: User = {
  name: 'Юрій К.',
  email: 'yurii.k@example.com',
  joinedDate: 'Січень 2024',
  languages: ['Українська', 'Англійська (A2)'],
  image: 'https://i.pravatar.cc/150?img=50',
  totalLessons: 12,
  walletBalance: 450,
};

export function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Мій Кабінет</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <ProfileSidebar user={user} />

        {/* RIGHT COLUMN */}
        <ProfileMainContent user={user} />
      </div>
    </div>
  );
}
