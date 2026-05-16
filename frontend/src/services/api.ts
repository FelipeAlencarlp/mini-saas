import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: 'http://localhost:8000'
});

api.interceptors.request.use((config) => {
    console.log(config)
    const token = Cookies.get('auth');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       // Tenta renovar o token usando o refresh token
//       const newToken = await refreshToken(); 
//       localStorage.setItem("token", newToken);
      
//       // Repete a requisição original com o novo token
//       originalRequest.headers.Authorization = `Bearer ${newToken}`;
//       return api(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );