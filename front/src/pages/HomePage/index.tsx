// src/pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { HomeContainer, ButtonContainer, ButtonLink } from "./styles";
import SideMenu from "../../components/SideMenu";

const HomePage: React.FC = () => {
  return (
    <div>
      <SideMenu />
      <HomeContainer>
        <h1>Welcome to MuscleMonitor</h1>
        <p>Your personal workout tracker</p>
        <ButtonContainer>
          <ButtonLink to="/login">Login</ButtonLink>
          <ButtonLink to="/register">Register</ButtonLink>
        </ButtonContainer>
      </HomeContainer>
      <Footer />
    </div>
  );
};

export default HomePage;
