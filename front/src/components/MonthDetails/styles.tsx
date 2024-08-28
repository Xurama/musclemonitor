import styled from "styled-components";

export const ResponsiveWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const Title = styled.h4`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InfoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
`;

export const ChartCardContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 0px;
  }
`;
