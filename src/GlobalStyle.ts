import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;

    font-family: "Open Sans", sans;
  }

  h1, h2, h3, h4, p {
    margin: 0;
  }

  input, textarea, button {
    text-align: start;
    font-family: inherit;
    font-size: inherit;
  }

  fieldset {
    margin: 0;
    padding: 0;

    border: 0;
  }
`;

export default GlobalStyle;
