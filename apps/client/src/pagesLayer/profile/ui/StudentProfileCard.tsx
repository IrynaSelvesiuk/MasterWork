import { User } from '@/entities/user';
import { FaUserEdit, FaGlobe, FaChalkboardTeacher } from 'react-icons/fa';

interface Props {
  user: User;
}

export const StudentProfileCard = ({ user }: Props) => (
  <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-green-500">
    <img
      src={user.image}
      alt={user.name}
      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
    />
    <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
    <p className="text-sm text-gray-600 mb-4">{user.email}</p>

    <div className="space-y-2 text-left text-sm mt-4">
      <p className="flex items-center text-gray-700">
        <FaGlobe className="mr-2 text-green-500" />
        Мови: {user.languages.join(', ')}
      </p>
      <p className="flex items-center text-gray-700">
        <FaChalkboardTeacher className="mr-2 text-green-500" />
        Уроків завершено:{' '}
        <span className="font-semibold ml-1">{user.totalLessons}</span>
      </p>
    </div>

    <button className="mt-5 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2">
      <FaUserEdit /> Редагувати профіль
    </button>
  </div>
);
