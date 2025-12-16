'use client';

import { StudentResponse } from '@/entities/student/model/student';
import { ROUTES } from '@/shared/router/routes';
import { ChangePasswordModal } from '@/widgets/student/ui/change-password-modal';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit, FaLock } from 'react-icons/fa';

interface Props {
  student: StudentResponse;
}

export const ProfileMainContent = ({ student }: Props) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <section className="lg:col-span-2 space-y-8">
      {/* Basic Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Профіль студента
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex-shrink-0">
            <Image
              src={'/default-avatar.png'}
              alt={`${student.user.firstName} ${student.user.lastName}`}
              width={100}
              height={100}
              className="rounded-full border border-gray-200 object-cover w-24 h-24"
            />
          </div>

          <ProfileItem label="Ім’я" value={student.user.firstName} />
          <ProfileItem label="Прізвище" value={student.user.lastName} />
          <ProfileItem label="Email" value={student.user.email} />
          <ProfileItem
            label="Цілі навчання"
            value={student.learningGoals || 'Не вказано'}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={ROUTES.STUDENT.UPDATE_PROFILE}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          <FaEdit /> Редагувати профіль
        </Link>

        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
        >
          <FaLock /> Змінити пароль
        </button>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </section>
  );
};

const ProfileItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800 truncate">
      {value || '—'}
    </p>
  </div>
);
