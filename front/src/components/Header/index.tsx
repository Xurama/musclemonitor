import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import {
  HeaderContainer,
  Title,
  NavLinks,
  NavItem,
  UsernameContainer,
  HamburgerIcon,
  MobileMenuOverlay,
  CloseIcon,
  MobileMenu,
} from "./styles";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close the menu after navigating
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu open/close state
  };

  return (
    <>
      <HeaderContainer>
        <Title>MuscleMonitor</Title>
        <NavLinks>
          <NavItem onClick={() => handleNavigate("/dashboard")}>
            Dashboard
          </NavItem>
          <NavItem onClick={() => handleNavigate("/workout")}>Workout</NavItem>
        </NavLinks>
        <UsernameContainer>
          {user && <span>{user.user.username}</span>}
        </UsernameContainer>
        <HamburgerIcon onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      </HeaderContainer>

      <AnimatePresence>
        {isOpen && (
          <>
            <MobileMenuOverlay onClick={toggleMenu} />
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#3643BA",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <CloseIcon onClick={toggleMenu}>&times;</CloseIcon>
              <MobileMenu>
                <NavItem onClick={() => handleNavigate("/dashboard")}>
                  Dashboard
                </NavItem>
                <NavItem onClick={() => handleNavigate("/workout")}>
                  Workout
                </NavItem>
              </MobileMenu>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
