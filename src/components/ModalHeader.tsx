import { IconSquareRoundedX } from "@tabler/icons-react";
import Button from "./Button";
import { MouseEventHandler } from "react";

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
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h2>{title}</h2>
      <Button onClick={onClose}>
        <IconSquareRoundedX size="1em" />
      </Button>
    </header>
  );
}
