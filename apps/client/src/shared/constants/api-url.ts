export const API_URL = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',

  SUBJECT: {
    ALL: '/subjects',
  },

  TEACHER: {
    ALL: '/teachers',
    ME: '/teachers/profile/me',
  },

  STUDENT: {
    ME: 'students/me',
  },

  BOOKINGS: {
    BASE: '/bookings',
    TEACHER: '/bookings/teacher',
  },
} as const;
