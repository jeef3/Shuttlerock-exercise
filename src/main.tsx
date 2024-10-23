import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import GlobalStyle from "./GlobalStyle.ts";
import { ModalProvider } from "react-modal-hook";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />

    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>,
);
