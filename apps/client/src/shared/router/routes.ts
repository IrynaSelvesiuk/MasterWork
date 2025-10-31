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

  TEACHER: {
    DASHBOARD: '/dashboard',
    CALENDAR: '/calendar',
    PROFILE: '/teacher-profile',
    ME: '/teacher-me',
    MY_STUDENTS: '/my-students',
  },

  TEACHER_CLASSES: '/teacher/classes',
  TEACHER_STUDENTS: '/teacher/students',
  TEACHER_SCHEDULE: '/teacher/schedule',

  TUTORS: '/tutors',
  TUTOR_ONBOARDING: '/tutor/onboarding',
} as const;
