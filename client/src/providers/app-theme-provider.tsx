import type { ReactNode } from "react";
import { CssBaseline } from "@/shared/components/theme";
import {
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "@/shared/configs";

const layerOrder = "@layer theme, base, mui, components, utilities;" as const;

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles={layerOrder} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
