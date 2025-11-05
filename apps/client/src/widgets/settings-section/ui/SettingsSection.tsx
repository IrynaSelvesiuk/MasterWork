'use client';

import { useState } from 'react';
import { SettingItem } from './SettingItem';
import { SettingItem as SettingItemWithToggle } from '@/widgets/student/index';
import { ChangePasswordModal } from '@/widgets/student/ui/change-password-modal';

export const SettingsSection = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Налаштування та Безпека
      </h2>
      <div className="space-y-4">
        <SettingItem
          label="Змінити пароль"
          description="Забезпечте безпеку свого облікового запису"
          onClick={() => setIsPasswordModalOpen(true)}
        />
        <SettingItemWithToggle
          label="Автоматичне збереження"
          description="Дозволяє автоматично зберігати зміни"
          hasToggle
        />
        <SettingItemWithToggle
          label="Звіти на email"
          description="Отримуйте щотижневі звіти про активність"
          hasToggle
        />
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};
