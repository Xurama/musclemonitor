// src/pages/WorkoutPage/styles.tsx
import styled from "styled-components";

export const WorkoutPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f4f4f9;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.div`
  margin-left: 200px; /* Adjusted to match the SideMenu width */
  padding: 20px;
  width: calc(100% - 200px);
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-left: 0; /* Remove margin-left on small screens */
    width: 100%; /* Full width on small screens */
    padding: 10px;
    margin-top: 10px;
  }
`;
