const BASE_URL = 'http://localhost:3005';

class ApiService {
  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
      ...options,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'API Error');
    }

    return response.json();
  }

  public get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>('GET', endpoint, undefined, options);
  }

  public post<T>(endpoint: string, data?: any, options?: RequestInit) {
    return this.request<T>('POST', endpoint, data, options);
  }

  public put<T>(endpoint: string, data?: any, options?: RequestInit) {
    return this.request<T>('PUT', endpoint, data, options);
  }

  public delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>('DELETE', endpoint, undefined, options);
  }
}

export const apiService = new ApiService();
