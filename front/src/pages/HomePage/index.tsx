// src/pages/HomePage/index.tsx
import React, { useContext } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { HomeContainer, ButtonContainer, ButtonLink, PageContainer } from "./styles"; // Import du nouveau style
import { AuthContext } from "../../context/AuthProvider";

const HomePage: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <PageContainer> {/* Utilisation du nouveau conteneur */}
      <Header />
      <HomeContainer>
        <h1>Welcome to MuscleMonitor</h1>
        <p>Your personal workout tracker</p>
        <ButtonContainer>
          {!user && (
            <>
              <ButtonLink to="/login">Login</ButtonLink>
              <ButtonLink to="/register">Register</ButtonLink>
            </>
          )}
        </ButtonContainer>
      </HomeContainer>
      <Footer />
    </PageContainer>
  );
};

export default HomePage;
