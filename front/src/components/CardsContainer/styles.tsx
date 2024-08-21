// styles.ts
import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Add some space between the cards */
`;

export const InfoCardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Add space between the InfoCards */
`;

export const ChartCardContainer = styled.div`
  flex: 2;
`;
