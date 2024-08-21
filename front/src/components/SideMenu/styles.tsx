// src/components/SideMenu/styles.tsx
import styled from "styled-components";
import { colors } from "../../styles/colors";

export const MenuContainer = styled.div<{ isOpen: boolean }>`
  width: 150px;
  height: 100vh;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  color: #fff;
  transition: transform 0.3s ease-in-out;
  transform: translateX(0); /* Default to being visible on larger screens */

  @media (max-width: 768px) {
    width: 60%;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

export const HamburgerIcon = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 20px;
  display: none; /* Hidden by default on larger screens */
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 1000;

  span {
    width: 100%;
    height: 4px;
    background-color: ${colors.primary};
    display: block;
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    display: flex; /* Only show on smaller screens */
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

export const MenuItem = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #444;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 5px;
    text-align: center;
    width: auto;
  }
`;

export const Username = styled.div`
  font-size: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

export const LogoutButton = styled(MenuItem)`
  color: #ff4b5c;

  @media (max-width: 768px) {
    font-size: 14px;
    color: #ff4b5c;
  }
`;
