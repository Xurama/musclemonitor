import styled from "styled-components";

export const WorkoutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 60px; /* Hauteur estimée du Header, ajustez si nécessaire */

  @media (max-width: 768px) {
    padding-top: 50px; /* Ajustez si le Header est plus petit sur mobile */
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
  padding-top: 30px;

  @media (max-width: 768px) {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 30px;
  }
`;
