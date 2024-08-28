import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Footer from "../../components/Footer";
import YearlyStats from "../../components/YearlyStats";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import { DashboardContainer, MainContent } from "./styles";

const DashboardPage: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  if (!user) {
    return null; // Prevent rendering anything if not logged in
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
