import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 0;
  display: block;

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

  textarea {
    resize: none;
  }

  input {
    line-height: 1;
  }

  input,
  textarea,
  select {
    transition: all 200ms ease-in-out;
  }

  input:hover:not(:disabled):not(:read-only),
  textarea:hover:not(:disabled):not(:read-only),
  select:hover:not(:disabled):not(:read-only) {
    border-color: hsl(220 80% 80%);
  }

  input:focus,
  textarea:focus,
  select:focus {
    border-color: hsl(220 85% 60%) !important;
    background: white;

    outline: 0;
    box-shadow: 0 0 0 2px hsl(220 80% 80%);
  }

  input:disabled,
  input:read-only,
  textarea:disabled,
  textarea:read-only,
  select:disabled,
  select:read-only {
    cursor: not-allowed;
    color: hsl(0 0% 50%);
    -webkit-text-fill-color: hsl(0 0% 50%);
    font-style: italic;

    background: hsl(0 0 95%);
  }
`;

export const Label = styled.label`
  position: absolute;
  z-index: 1;
  top: 6px;
  left: 9px;

  pointer-events: none;

  line-height: 16px;
  font-size: 12px;
  color: hsl(0 0% 60%);
`;

export const Control = styled.div`
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin: 0;
  padding: 20px 8px 8px;

  font-size: 16px;
  color: hsl(0 0% 10%);

  border: solid 1px;
  border-color: hsl(0 0% 70%);

  border-radius: 4px;
  background: transparent;
`;
