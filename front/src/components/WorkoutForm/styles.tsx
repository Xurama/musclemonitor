import styled from "styled-components";
import { colors } from "../../styles/colors";

const sharedInputStyles = `
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
  max-width: 100%;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
    max-width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 97%;
  margin: 0 auto; /* Centrer le formulaire */

  @media (max-width: 768px) {
    gap: 15px;
    width: 90%;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Input = styled.input`
  ${sharedInputStyles}
`;

export const Select = styled.select`
  ${sharedInputStyles}
`;

export const Textarea = styled.textarea`
  ${sharedInputStyles}
`;

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: ${colors.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

export const ExerciseContainer = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  width: 100%;

  @media (max-width: 768px) {
    padding: 8px;
    margin-bottom: 15px;
    width: 95%;
  }
`;

export const RepsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    flex-direction: column;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const WorkoutList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#4CAF50" : "#ccc")};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#45a049" : "#bbb")};
  }

  &:focus {
    outline: none;
  }
`;

export const WorkoutButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  font-size: 16px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;
