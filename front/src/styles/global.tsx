import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

export default createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background-color: ${colors.background};
    color: ${colors.text};
    margin: 0;
    padding: 0;
  }

  h2 {
    color: ${colors.primary};
  }
`;
