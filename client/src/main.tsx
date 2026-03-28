import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { StyledEngineProvider, GlobalStyles } from "@/shared/components/theme";

const layerOrder = "@layer theme, base, mui, components, utilities;" as const;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles={layerOrder} />
      <App />
    </StyledEngineProvider>
  </StrictMode>,
);
