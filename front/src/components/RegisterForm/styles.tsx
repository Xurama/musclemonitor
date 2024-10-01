import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: ${colors.background};
  padding: 2rem;
  border-radius: 8px;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

export const Error = styled.div`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const Title = styled.h2`
  color: ${colors.primary};
  text-align:center;
`;
