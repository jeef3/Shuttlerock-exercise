import styled from "styled-components";

export type ButtonType = "transparent" | "action" | "destructive";

export interface ButtonProps {
  $active?: boolean;
  $type?: ButtonType;
}

function getBaseColor({ $type = "transparent" }: ButtonProps) {
  switch ($type) {
    case "transparent":
      return "white";
    case "action":
      return "hsl(140 85% 35%)";
    case "destructive":
      return "hsl(0 85% 35%)";
  }
}

function getForegroundColor({ $type = "transparent" }: ButtonProps) {
  switch ($type) {
    case "transparent":
      return "color-mix(in hsl, var(--base), black 60%)";
    case "action":
      return "white";
    case "destructive":
      return "white";
  }
}

const Button = styled.button<ButtonProps>`
  --base: ${getBaseColor};
  --foreground: ${getForegroundColor};

  padding: 5px;

  cursor: pointer;
  color: var(--foreground);
  font-size: 14px;

  border: 0;
  border-radius: 6px;
  background: var(--base);

  ${({ $active = false }) =>
    $active &&
    `
  color: white;
  background: hsl(220 85% 35%);
  `}

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  transition: all 100ms ease-in-out;

  &:hover {
    background: color-mix(in hsl, var(--base), black 10%);

    ${({ $active = false }) =>
      $active &&
      `
    color: white;
    background: color-mix(in hsl, hsl(220 85% 35%), black 10%);
    `}
  }

  &:active {
    background: color-mix(in hsl, var(--base), black 15%);

    ${({ $active = false }) =>
      $active &&
      `
    color: white;
    background: color-mix(in hsl, hsl(220 85% 35%), black 15%);
    `}
  }

  &:disabled {
    color: color-mix(in hsl, var(--base), white 50%);
    background: color-mix(in hsl, var(--base), black 20%);
  }

  & svg {
    display: block;
  }
`;

export default Button;
