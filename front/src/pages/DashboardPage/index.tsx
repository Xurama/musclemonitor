import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Footer from "../../components/Footer";
import YearlyStats from "../../components/YearlyStats";
import Header from "../../components/Header";
import { DashboardContainer, MainContent } from "./styles";

const DashboardPage: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <DashboardContainer>
      <Header />
      <MainContent>
        <YearlyStats />
      </MainContent>
      <Footer />
    </DashboardContainer>
  );
};

export default DashboardPage;
