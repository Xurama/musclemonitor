import styled from "styled-components";
import { colors } from "../../styles/colors";

export const StatsContainer = styled.div`
  background-color: ${colors.white};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 15px;
    width: 87%;
  }
`;

export const Title = styled.h2`
  color: ${colors.primary};
  margin-bottom: 20px;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

interface ButtonProps {
  isSelected: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.isSelected ? colors.primary : colors.white)};
  color: ${(props) => (props.isSelected ? colors.white : colors.primary)};
  margin: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid ${colors.primary};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.isSelected ? colors.white : colors.primary)};
    color: ${(props) => (props.isSelected ? colors.primary : colors.white)};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;  /* Increased padding for better touch area */
  margin: 10px 0;
  border-radius: 5px;
  border: 2px solid ${colors.primary};
  background-color: ${colors.white};
  color: ${colors.primary};
  font-size: 18px;  /* Larger font size */
  line-height: 1.5;  /* Increased line-height for better readability */

  @media (max-width: 768px) {
    font-size: 16px;  /* Adjusted for mobile */
    padding: 12px;
  }
`;

export const Option = styled.option`
  font-size: 18px; /* Ensures options in dropdown are larger */
  
  @media (max-width: 768px) {
    font-size: 16px; /* Adjusted for mobile */
  }
`;
