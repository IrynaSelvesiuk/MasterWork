export const ROUTES = {
  BASE: '/',

  LOGIN: '/login',
  REGISTER: '/auth/register',
  REGISTER_TEACHER: '/auth/register-teacher',

  HELP: '/help',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',

  LESSONS: '/profile/lessons',
  WALLET: '/profile/waller',
  MESSAGES: '/profile/messages',

  TUTORS: '/tutors',
  TUTOR_ONBOARDING: '/tutor/onboarding',
} as const;
