import { MouseEventHandler } from "react";
import { IconX } from "@tabler/icons-react";

import Button from "./Button";

export default function ModalHeader({
  title,
  onClose,
}: {
  title: string;
  onClose?: MouseEventHandler;
}) {
  return (
    <header
      style={{
        padding: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h2>{title}</h2>
      <Button onClick={onClose}>
        <IconX size="1em" />
      </Button>
    </header>
  );
}
