import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin: 0px;
  }
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

export const CardContent = styled.div`
  margin-top: 10px;
  font-size: 24px;
  color: #666;
`;
