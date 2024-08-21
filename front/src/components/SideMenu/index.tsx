// src/components/SideMenu/index.tsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import {
  MenuContainer,
  MenuItem,
  Username,
  LogoutButton,
  HamburgerIcon,
  MobileMenuOverlay,
} from "./styles";

const SideMenu: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HamburgerIcon onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </HamburgerIcon>

      <MenuContainer isOpen={isOpen}>
        {user && (
          <>
            <Username>{user.user.username}</Username>
            <MenuItem onClick={() => navigate("/dashboard")}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => navigate("/workout")}>
              Create Workout
            </MenuItem>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        )}
        {!user && (
          <>
            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
            <MenuItem onClick={() => navigate("/register")}>Register</MenuItem>
          </>
        )}
      </MenuContainer>
      {isOpen && <MobileMenuOverlay onClick={toggleMenu} />}
    </>
  );
};

export default SideMenu;
