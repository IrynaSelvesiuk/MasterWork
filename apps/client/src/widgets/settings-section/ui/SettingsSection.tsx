import { SettingItem } from './SettingItem';

export const SettingsSection = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      Налаштування та Безпека
    </h2>
    <div className="space-y-4">
      <SettingItem
        label="Змінити пароль"
        description="Забезпечте безпеку свого облікового запису"
      />
      <SettingItem
        label="Двоетапна перевірка"
        description="Додайте додатковий рівень захисту"
      />
      <SettingItem
        label="Керування сповіщеннями"
        description="Оберіть, які сповіщення отримувати"
      />
    </div>
  </div>
);
