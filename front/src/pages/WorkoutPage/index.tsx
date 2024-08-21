// src/pages/WorkoutPage.tsx
import React from "react";
import WorkoutForm from "../../components/WorkoutForm";
import SideMenu from "../../components/SideMenu";
import { WorkoutPageContainer, MainContent } from "./styles";

const WorkoutPage: React.FC = () => {
  return (
    <WorkoutPageContainer>
      <SideMenu />
      <MainContent>
        <h1>Create a Workout</h1>
        <WorkoutForm />
      </MainContent>
    </WorkoutPageContainer>
  );
};

export default WorkoutPage;
