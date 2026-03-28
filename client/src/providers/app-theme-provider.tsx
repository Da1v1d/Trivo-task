import type { ReactNode } from "react";
import { CssBaseline, createTheme } from "@/shared/components/theme";
import {
  GlobalStyles,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

const layerOrder = "@layer theme, base, mui, components, utilities;" as const;

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
    },
    background: {
      default: "#f8fafc",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

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
