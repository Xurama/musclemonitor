import styled from "styled-components";
import { colors } from "../../styles/colors";

interface HamburgerIconProps {
  $isOpen: boolean;
}

export const HamburgerIcon = styled.div<HamburgerIconProps>`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 20px;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 1001;

  span {
    width: 100%;
    height: 4px;
    background-color: ${colors.white};
    display: block;
    transition: all 0.3s ease-in-out;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    span:nth-child(1) {
      transform: rotate(45deg);
      position: absolute;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg);
      position: absolute;
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
    }
  `}

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const ClosedSideBar = styled.div`
  width: 0px;
  height: 100vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  color: #fff;
  z-index: 1000;

  @media (min-width: 769px) {
    background-color: ${colors.primary};
  }
`;

export const OpenSideBar = styled.div`
  height: 100vh;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  left: 0;
  top: 0;
  color: #3643BA;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  padding-top: 5px;
  width: 100%;
  max-width: 300px;

  @media (min-width: 769px) {
    transform: translateX(0);
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
`;

export const Username = styled.div`
  font-size: 20px;
  color: #fff;
  margin-bottom: 20px;
`;

export const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.primary};
  z-index: 999;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MenuItem = styled.div`
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px 0;
  text-align: left;
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
    bottom: -2px;
    left: 0;
  }

  &:hover {
    transform: scale(1.05);
    color: ${colors.secondary}; /* Optional: Change text color on hover */
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 5px;
    text-align: center;
    width: 100%;
  }
`;

export const LogoutButton = styled(MenuItem)`
  color: #ff4b5c;

  &:hover {
    transform: scale(1.05);
    color: #ff6f7a; /* Slightly lighter red on hover */
  }

  @media (max-width: 768px) {
    font-size: 14px;
    color: #ff4b5c;
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ffffff;
  margin: 10px 0;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
