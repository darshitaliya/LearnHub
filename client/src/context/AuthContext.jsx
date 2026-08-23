import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('learnhub_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('learnhub_token') || '');
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const activeToken = localStorage.getItem('learnhub_token') || token;
    if (!activeToken) return null;
    try {
      const res = await api.get('/auth/me');
      if (res.data && (res.data.id || res.data._id)) {
        setUser(res.data);
        localStorage.setItem('learnhub_user', JSON.stringify(res.data));
        return res.data;
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
      }
    }
    return null;
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('learnhub_token');
    if (savedToken) {
      setToken(savedToken);
      api
        .get('/auth/me')
        .then((res) => {
          if (res.data && (res.data.id || res.data._id)) {
            setUser(res.data);
            localStorage.setItem('learnhub_user', JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            logout();
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (emailOrData, password, captchaToken, captchaInput) => {
    let payload = {};
    if (typeof emailOrData === 'object' && emailOrData !== null) {
      payload = emailOrData;
    } else {
      payload = {
        email: emailOrData,
        password,
        ...(captchaToken && { captchaToken }),
        ...(captchaInput && { captchaInput }),
      };
    }
    const res = await api.post('/auth/login', payload);
    const authToken = res.data.token;
    const authUser = res.data.user;

    localStorage.setItem('learnhub_token', authToken);
    localStorage.setItem('learnhub_user', JSON.stringify(authUser));

    setToken(authToken);
    setUser(authUser);
    setLoading(false);
    return authUser;
  };

  const register = async (nameOrData, email, phone, password) => {
    const payload =
      typeof nameOrData === 'object' && nameOrData !== null
        ? nameOrData
        : { name: nameOrData, email, phone, password };

    const shouldAutoLogin = payload.autoLogin !== false;
    const { autoLogin, ...apiPayload } = payload;

    const res = await api.post('/auth/register', apiPayload);
    const authToken = res.data.token;
    const authUser = res.data.user;

    if (shouldAutoLogin) {
      localStorage.setItem('learnhub_token', authToken);
      localStorage.setItem('learnhub_user', JSON.stringify(authUser));
      setToken(authToken);
      setUser(authUser);
    }
    setLoading(false);
    return authUser;
  };

  const logout = async () => {
    try {
      const activeToken = localStorage.getItem('learnhub_token');
      if (activeToken) {
        await api.post('/auth/logout').catch(() => {});
      }
    } catch (err) {
      console.warn('Logout API call error:', err);
    } finally {
      localStorage.removeItem('learnhub_token');
      localStorage.removeItem('learnhub_user');
      setToken('');
      setUser(null);
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    const res = await api.put('/auth/profile', profileData);
    if (res.data.user) {
      setUser(res.data.user);
      localStorage.setItem('learnhub_user', JSON.stringify(res.data.user));
      return res.data.user;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isInstructor: user?.role === 'instructor' || user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

