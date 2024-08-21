import styled from "styled-components";
import { colors } from "../../styles/colors";

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid ${colors.primary};
`;

export const Title = styled.h2`
  color: ${colors.primary};
`;
