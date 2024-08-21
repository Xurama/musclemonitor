// src/pages/styles.tsx
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../styles/colors";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

export const ButtonLink = styled(Link)`
  padding: 1rem 2rem;
  background-color: ${colors.primary};
  color: ${colors.white};
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
  &:hover {
    background-color: ${colors.secondary};
  }
`;
