import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, User } from '@/types/auth';
import { api } from '../core/api';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthProvider: Checking for saved user in localStorage');
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      console.log('AuthProvider: User found in localStorage', JSON.parse(savedUser));
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log('AuthProvider: Sending login request to', process.env.REACT_APP_API_URL + '/users/login');
      const response = await api.post('/users/login', { username, password });
      const user = response.data;
      console.log('AuthProvider: Login successful', user);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error) {
      console.error('AuthProvider: Login failed', error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    const response = await api.post('/users/register', { username, password });
    const user = response.data;
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/dashboard');
  };

  const logout = () => {
    console.log('AuthProvider: Logging out');
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return null; // Or a spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};