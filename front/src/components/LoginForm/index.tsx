// src/components/LoginForm/index.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Error } from "./styles";
import { AuthContext } from "../../context/AuthProvider";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      console.log("handleLogin()");
      await login(username, password); // Use login function from context
      setError("");
      navigate("/dashboard");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}> {/* Set onSubmit event to the form */}
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button type="submit">Login</Button> {/* Ensure button type is submit */}
        {error && <Error>{error}</Error>}
      </Form>
    </div>
  );
};

export default LoginForm;
