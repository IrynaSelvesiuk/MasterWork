import { StudentResponse } from '@/entities/student/model/student';
import { FaUserEdit, FaGlobe } from 'react-icons/fa';

interface Props {
  student: StudentResponse;
}

export const StudentProfileCard = ({ student }: Props) => (
  <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-green-500">
    <img
      src={student.avatarUrl}
      alt={student.user.firstName}
      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
    />
    <h2 className="text-2xl font-bold text-gray-800">
      {student.user.firstName}
    </h2>
    <p className="text-sm text-gray-600 mb-4">{student.user.email}</p>

    <div className="space-y-2 text-left text-sm mt-4">
      <p className="flex items-center text-gray-700">
        <FaGlobe className="mr-2 text-green-500" />
        Мови: {student.languages.join(', ')}
      </p>
    </div>

    <button className="mt-5 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2">
      <FaUserEdit /> Редагувати профіль
    </button>
  </div>
);
