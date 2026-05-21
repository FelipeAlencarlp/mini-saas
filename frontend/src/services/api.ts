import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: 'http://localhost:8000'
});

// Token
api.interceptors.request.use((config) => {
    const token = Cookies.get('auth');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// Refresh Token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || '';

    const isAuthRoute =
        url.includes('/auth/login') ||
        url.includes('/auth/refresh');

    if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthRoute
    ) {
      originalRequest._retry = true;
      
      try {
        // Tenta renovar o token usando o refresh token
        const newToken = await refreshToken();

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api.request(originalRequest);

      } catch (refreshError) {
        Cookies.remove('auth');
        Cookies.remove('refresh');

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export async function refreshToken() {
    const refresh = Cookies.get('refresh');

    if (!refresh) {
        throw new Error('Refresh token não encontrado.');
    }

    const response = await axios.post(
        'http://localhost:8000/auth/refresh',
        {
            refreshToken: refresh
        }
    );

    const { accessToken, refreshToken } = response.data.data;

    Cookies.set('auth', accessToken);
    Cookies.set('refresh', refreshToken);

    return accessToken;
}