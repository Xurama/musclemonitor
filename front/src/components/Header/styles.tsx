import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #282c34;
  color: white;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center; /* Center items vertically */
  gap: 10px;
`;

export const Button = styled.button`
  background-color: #61dafb;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: #282c34;
  border-radius: 5px;

  &:hover {
    background-color: #21a1f1;
  }
`;

export const Username = styled.span`
  font-size: 16px;
  color: white;
  margin-right: 10px; /* Add some space between the username and the logout button */
`;
