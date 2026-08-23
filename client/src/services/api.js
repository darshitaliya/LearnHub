import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

// Interceptor to attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('learnhub_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle 401 responses and clear stale tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const url = error.config?.url || '';
      const isAuthLoginOrRegister = url.includes('/auth/login') || url.includes('/auth/register');
      if (!isAuthLoginOrRegister) {
        localStorage.removeItem('learnhub_token');
        localStorage.removeItem('learnhub_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
