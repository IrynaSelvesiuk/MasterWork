import { axiosClient } from '@/shared/config/axios-config';
import { LoginFormData } from './schemas/login-schema';
import { RegisterFormData } from './schemas/register-schema';
import { API_URL } from '@/shared/constants/api-url';
import { UserResponse } from '@/entities/user/model/user-response';

class AuthService {
  constructor() {}

  async login(data: LoginFormData) {
    const response = await axiosClient.post(API_URL.AUTH_LOGIN, {
      ...data,
    });

    return response.data;
  }

  async register(
    data: RegisterFormData
  ): Promise<{ success: boolean; userDto: UserResponse }> {
    const response = await axiosClient.post(API_URL.AUTH_REGISTER, {
      ...data,
      role: 'STUDENT',
    });

    return response.data;
  }

  async logout() {
    await axiosClient.post(API_URL.AUTH_LOGOUT);
  }

  async getMe() {}
}

export const authService = new AuthService();
