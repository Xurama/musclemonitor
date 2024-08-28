import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import {
  MenuItem,
  Title,
  Username,
  LogoutButton,
  HamburgerIcon,
  MobileMenuOverlay,
  ClosedSideBar,
  OpenSideBar,
  Separator,
  Section,
} from "./styles";

const SideMenu: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false); // Close the menu after logout
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close the menu after navigating
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu open/close state
  };

  return (
    <>
      <HamburgerIcon $isOpen={isOpen} onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </HamburgerIcon>

      {isOpen ? (
        <>
          <MobileMenuOverlay onClick={toggleMenu}>
            <OpenSideBar onClick={(e) => e.stopPropagation()}>
              <Title>MuscleMonitor</Title>
              <Separator />
              <Section>
                <MenuItem onClick={() => handleNavigate("/dashboard")}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => handleNavigate("/workout")}>
                  Workout
                </MenuItem>
              </Section>
              <Separator />
              <Section>
                {user && <Username>{user.user.username}</Username>}
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </Section>
            </OpenSideBar>
          </MobileMenuOverlay>
        </>
      ) : (
        <ClosedSideBar>
          <span />
        </ClosedSideBar>
      )}
    </>
  );
};

export default SideMenu;
