import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 0;
  display: block;

  padding: 28px;

  border-radius: 4px;
  background: white;

  input::placeholder,
  select:required:invalid {
    opacity: 1;
    font-style: italic;
    color: hsl(0 0% 90%) !important;
  }

  select:required:invalid option {
    color: inherit;
    font-style: normal;
  }

  option[value=""][disabled] {
    display: none;
  }

  select {
    appearance: none;
    cursor: pointer;
  }

  input,
  select {
    transition: all 200ms ease-in-out;
  }

  input:hover:not(:disabled):not(:read-only),
  textarea:hover:not(:disabled):not(:read-only),
  select:hover:not(:disabled):not(:read-only) {
    border-color: blue;
  }

  input:focus,
  select:focus {
    border-color: blue;
    background: pink;

    outline: 0;
    box-shadow: 0 0 0 3px blue;
  }

  input:disabled,
  input:read-only,
  textarea:disabled,
  select:disabled {
    cursor: not-allowed;
    color: lime;
    -webkit-text-fill-color: lime;
    font-style: italic;

    background: red;
  }
`;

export const Label = styled.label`
  pointer-events: none;

  display: block;
  position: relative;
  z-index: 1;

  line-height: 16px;
  font-size: 12px;
  color: red;
`;

export const Control = styled.div`
  position: absolute;
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin: 0;
  padding: 16px;
  top: 0;
  left: 0;

  font-size: 14px;
  color: pink;

  border: solid 1px;
  border-color: blue;

  border-radius: 4px;
  background: transparent;
`;
