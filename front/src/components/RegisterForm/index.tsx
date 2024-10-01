// src/components/RegisterForm/index.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { Form, Input, Button, Error, Title } from './styles';
import { useTranslation } from 'react-i18next';

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch'));
      return;
    }

    try {
      await register(username, password);
      setError('');
      navigate('/dashboard');
    } catch (error) {
      setError(t('register.error'));
    }
  };

  return (
    <div>
      <Title>{t('register.title')}</Title>
      <Form>
        <Input
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder={t('register.username')}
        />
        <Input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder={t('register.password')}
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          placeholder={t('register.confirmPassword')}
        />
        <Button onClick={handleRegister}>{t('register.submit')}</Button>
        {error && <Error>{error}</Error>}
      </Form>
    </div>
  );
};

export default RegisterForm;
