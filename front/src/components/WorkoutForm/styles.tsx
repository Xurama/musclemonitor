import styled from "styled-components";

const sharedInputStyles = `
  box-sizing: border-box; /* Ensures padding and borders are included in width/height */
  width: 100%; /* Ensures the element takes up full width of the container */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
  max-width: 100%; /* Max-width to keep consistent sizing */

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
    max-width: 100%; /* Allow full width on smaller screens */
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

  @media (max-width: 768px) {
    padding: 10px;
    gap: 15px;
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
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; /* Ensure the button takes full width */

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
  width: 100%; /* Ensure the container takes full width */

  @media (max-width: 768px) {
    padding: 8px;
    margin-bottom: 15px;
  }
`;

export const RepsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    flex-direction: column; /* Stack the inputs vertically on small screens */
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
