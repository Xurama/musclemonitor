// src/pages/RegisterPage/index.tsx
import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PageContainer, ContentContainer } from "./styles"; // Importation des styles

const RegisterPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <div>You are already registered and logged in!</div>;
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <RegisterForm />
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default RegisterPage;
