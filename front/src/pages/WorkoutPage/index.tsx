// src/pages/WorkoutPage.tsx
import React from "react";
import WorkoutForm from "../../components/WorkoutForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { WorkoutPageContainer, MainContent } from "./styles";

const WorkoutPage: React.FC = () => {
  return (
    <WorkoutPageContainer>
      <Header />
      <MainContent>
        <WorkoutForm />
      </MainContent>
      <Footer />
    </WorkoutPageContainer>
  );
};

export default WorkoutPage;
