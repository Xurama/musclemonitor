import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { colors } from "../../styles/colors";
import i18n from "../../i18n/i18n"; // Import de i18n pour la gestion des langues
import { useTranslation } from 'react-i18next'; // Import de useTranslation pour l'utilisation des traductions
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
  LogoutButton,
  LanguageSelect,
} from "./styles";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <>
      <HeaderContainer>
        <Title onClick={() => handleNavigate("/")}>
          MuscleMonitor
        </Title>
        <NavLinks>
          <NavItem onClick={() => handleNavigate("/dashboard")}>
            {t('header.dashboard')}
          </NavItem>
          <NavItem onClick={() => handleNavigate("/workout")}>
            {t('header.workout')}
          </NavItem>
        </NavLinks>
        <UsernameContainer>
          {user && <span>{user.user.username}</span>}
          {user && (
            <LogoutButton onClick={handleLogout}>
              {t('header.logout')}
            </LogoutButton>
          )}
          <LanguageSelect value={language} onChange={handleChangeLanguage}>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </LanguageSelect>
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
                backgroundColor: colors.primary,
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
                  {t('header.dashboard')}
                </NavItem>
                <NavItem onClick={() => handleNavigate("/workout")}>
                  {t('header.workout')}
                </NavItem>
                {user && (
                  <>
                    <span>{user.user.username}</span>
                    <LogoutButton onClick={handleLogout}>
                      {t('header.logout')}
                    </LogoutButton>
                  </>
                )}
              </MobileMenu>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
