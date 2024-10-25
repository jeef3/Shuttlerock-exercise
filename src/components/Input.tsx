import { forwardRef } from "react";
import { Container, Control, Label } from "./atoms/InputAtoms";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <Container>
        <Label>
          <span>{label}</span>
        </Label>

        <Control as="input" ref={ref} {...rest} />
      </Container>
    );
  },
);

export default Input;
