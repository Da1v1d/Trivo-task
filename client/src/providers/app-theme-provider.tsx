import type { ReactNode } from "react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
} from "@/shared/components/theme";

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

type AppThemeProviderProps = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
