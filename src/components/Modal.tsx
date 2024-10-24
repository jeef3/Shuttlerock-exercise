import { ReactNode } from "react";
import styled from "styled-components";

import Overlay from "./atoms/Overlay";

const Container = styled.dialog`
  overflow: hidden;
  position: fixed;

  top: 50px;
  width: 320px;
  max-width: 90vw;
  padding: 0;

  border: 0;
  border-radius: 20px;

  box-shadow: 0 20px 20px hsl(0 0% 0% / 25%);
`;

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <>
      <Overlay />
      <Container open>{children}</Container>
    </>
  );
}
