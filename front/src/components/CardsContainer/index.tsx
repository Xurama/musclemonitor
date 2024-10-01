import React from 'react';
import { CardWrapper } from './styles';

interface CardsContainerProps {
  children: React.ReactNode;
}

const CardsContainer: React.FC<CardsContainerProps> = ({ children }) => (
  <CardWrapper>
    {children}
  </CardWrapper>
);

export default CardsContainer;
