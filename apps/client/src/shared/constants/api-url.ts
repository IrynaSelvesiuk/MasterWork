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
    ME: '/teachers/profile/me',
  },

  STUDENT: {
    ME: 'students/me',
  },
} as const;
