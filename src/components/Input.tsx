import { forwardRef, useId } from "react";
import { Container, Control, Label } from "./atoms/InputAtoms";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => {
    const id = useId();

    return (
      <Container>
        <Label htmlFor={id}>
          <span>{label}</span>
        </Label>

        <Control id={id} as="input" ref={ref} {...rest} />
      </Container>
    );
  },
);

export default Input;
