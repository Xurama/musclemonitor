// src/pages/LoginPage/index.tsx
import React from "react";
import LoginForm from "../../components/LoginForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PageContainer, ContentContainer } from "./styles";

const LoginPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <div>You are already logged in!</div>;
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <LoginForm />
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default LoginPage;
