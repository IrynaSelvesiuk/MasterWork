import { ROUTES } from '@/shared/router/routes';
import Link from 'next/link';

export const BecomeTutorSection = () => (
  <div className="mt-8 p-5 bg-lime-50 rounded-xl border border-lime-200 shadow-sm text-center">
    <h3 className="text-lg font-bold text-green-800 mb-2">
      Станьте репетитором!
    </h3>
    <p className="text-sm text-gray-600 mb-4">
      Поділіться своїми знаннями та почніть заробляти на Tutors.
    </p>
    <Link
      href={ROUTES.TUTOR_ONBOARDING || '#'}
      className="w-full inline-flex items-center justify-center bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition"
    >
      Розпочати
    </Link>
  </div>
);
