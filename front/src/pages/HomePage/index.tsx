// src/pages/HomePage.tsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { HomeContainer, ButtonContainer, ButtonLink } from "./styles";
import { AuthContext } from "../../context/AuthProvider";

const HomePage: React.FC = () => {
  const { user } = useContext(AuthContext); // Accéder au contexte d'authentification

  return (
    <div>
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
    </div>
  );
};

export default HomePage;
