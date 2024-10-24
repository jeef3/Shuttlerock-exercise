import { MouseEventHandler } from "react";
import { IconX } from "@tabler/icons-react";

import Button from "./Button";
import styled from "styled-components";

const Container = styled.header`
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ModalHeader({
  title,
  onClose,
}: {
  title: string;
  onClose?: MouseEventHandler;
}) {
  return (
    <Container>
      <h2>{title}</h2>

      <Button onClick={onClose}>
        <IconX size="1em" />
      </Button>
    </Container>
  );
}
