import React from 'react';
import { Card } from './styles';

interface ChartCardProps {
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ children }) => (
  <Card>
    {children}
  </Card>
);

export default ChartCard;
