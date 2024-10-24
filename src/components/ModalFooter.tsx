import { MouseEventHandler, ReactElement } from "react";
import Button from "./Button";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function ModalFooter({ buttons }: { buttons: ReactElement }) {
  return (
    <div
      style={{
        padding: 16,
        background: "hsl(0 0% 95%)",
        display: "grid",
        gridAutoFlow: "column",
        gap: 16,
      }}
    >
      {buttons}
    </div>
  );
}
