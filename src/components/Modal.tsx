import { ReactNode } from "react";
import Overlay from "./atoms/Overlay";

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <>
      <Overlay />
      <dialog
        open
        style={{
          overflow: "hidden",
          position: "fixed",
          top: 50,
          width: 320,
          maxWidth: "90vw",
          padding: 0,

          border: 0,
          borderRadius: 20,
          boxShadow: "0 20px 20px hsl(0 0% 0% / 25%)",
        }}
      >
        {children}
      </dialog>
    </>
  );
}
