import React from 'react';
import { Card, CardTitle, CardContent } from './styles';

interface InfoCardProps {
  title: string;
  content: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => (
  <Card>
    <CardTitle>{title}</CardTitle>
    <CardContent>{content}</CardContent>
  </Card>
);

export default InfoCard;
