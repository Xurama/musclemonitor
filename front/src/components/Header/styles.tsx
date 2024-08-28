import styled from "styled-components";
import { colors } from "../../styles/colors";

interface HamburgerIconProps {
  $isOpen?: boolean;
}

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.primary};
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  justify-content: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.div`
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background-color: #fff;
    transition: width 0.3s ease;
    position: absolute;
    bottom: -5px;
    left: 0;
  }

  &:hover {
    transform: scale(1.05);
    color: ${colors.secondary};
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 10px 0;
  }
`;

export const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  span {
    color: #fff;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HamburgerIcon = styled.div<HamburgerIconProps>`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 1001;
  gap: 5px;

  span {
    width: 30px;
    height: 4px;
    background-color: ${colors.white};
    display: block;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
