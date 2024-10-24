import styled from "styled-components";
import Button from "./Button";

const ButtonGroup = styled.div`
  border: solid 1px hsl(0 0% 90%);
  border-radius: 7px;
  background: hsl(0 0% 90%);

  display: flex;
  gap: 1px;

  & ${Button} {
    padding-left: 8px;
    padding-right: 8px;
  }

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
