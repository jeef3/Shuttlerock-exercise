import { forwardRef, useId } from "react";
import { Container, Control, Label } from "./atoms/InputAtoms";

interface InputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ label, ...rest }, ref) => {
    const id = useId();

    return (
      <Container>
        <Label htmlFor={id}>
          <span>{label}</span>
        </Label>

        <Control id={id} as="textarea" ref={ref} {...rest} />
      </Container>
    );
  },
);

export default TextArea;
