// src/pages/HomePage/style.tsx
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../styles/colors";

// Conteneur principal de la page
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Pour assurer que la page prend toute la hauteur de l'écran */
`;

// Conteneur pour le contenu de la page (entre le header et le footer)
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1; /* Le contenu occupe tout l'espace disponible */
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
