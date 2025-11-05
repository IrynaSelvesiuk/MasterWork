'use client';

import { useUpdatePassword } from '@/entities/user/hooks/useUpdatePassword';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const { mutateAsync, isPending } = useUpdatePassword();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('Паролі не співпадають ❌');
      return;
    }

    try {
      const res = await mutateAsync({ currentPassword, newPassword });

      if (res.success) {
        setMessage('Пароль успішно оновлено ✅');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage(res.message || 'Не вдалося оновити пароль ❌');
      }
    } catch (err) {
      setMessage('Помилка при зміні пароля ❌');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Змінити пароль</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            placeholder="Поточний пароль"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            type="password"
            placeholder="Новий пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            type="password"
            placeholder="Підтвердження пароля"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />

          {message && (
            <p className="text-center text-sm text-gray-600">{message}</p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 text-sm hover:underline"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition"
            >
              {isPending ? 'Оновлення...' : 'Зберегти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
