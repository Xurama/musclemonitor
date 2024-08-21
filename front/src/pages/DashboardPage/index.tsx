import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Footer from "../../components/Footer";
import YearlyStats from "../../components/YearlyStats";
import SideMenu from "../../components/SideMenu";
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
      <SideMenu />
      <MainContent>
        <div style={{ padding: "20px" }}>
          <YearlyStats />
        </div>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;
