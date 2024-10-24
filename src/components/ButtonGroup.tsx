import styled from "styled-components";
import Button from "./Button";

const ButtonGroup = styled.div`
  display: flex;

  & ${Button}:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  & ${Button}:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export default ButtonGroup;
