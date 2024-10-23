import { MouseEventHandler } from "react";
import Button from "./Button";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function ModalFooter({
  onClick,
}: {
  onClick?: MouseEventHandler;
}) {
  return (
    <div style={{ display: "grid", padding: 16, background: "hsl(0 0% 95%)" }}>
      <Button $type="action" onClick={onClick}>
        <IconDeviceFloppy size="1em" /> Save
      </Button>
    </div>
  );
}
