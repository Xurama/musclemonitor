import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Error, Title } from "./styles";
import { AuthContext } from "../../context/AuthProvider";
import { useTranslation } from 'react-i18next';

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      console.log("handleLogin()");
      await login(username, password);
      setError("");
      navigate("/dashboard");
    } catch (error) {
      setError(t("login.error"));
    }
  };

  return (
    <div>
      <Title>{t('login.title')}</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder={t('login.username')}
        />
        <Input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder={t('login.password')}
        />
        <Button type="submit">{t('login.submit')}</Button>
        {error && <Error>{error}</Error>}
      </Form>
    </div>
  );
};

export default LoginForm;
