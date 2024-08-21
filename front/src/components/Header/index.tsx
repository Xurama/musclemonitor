import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Container, Title, ButtonGroup, Button, Username } from "./styles";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <Container>
      <Title>MuscleMonitor</Title>
      <ButtonGroup>
        {user ? (
          <>
            <Username>{user.user.username}</Username>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>Se connecter</Button>
            <Button onClick={() => navigate("/register")}>S'enregistrer</Button>
          </>
        )}
      </ButtonGroup>
    </Container>
  );
};

export default Header;
