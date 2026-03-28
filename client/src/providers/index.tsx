import { AppQueryProvider } from "@/providers/app-query-provider";
import { AppThemeProvider } from "@/providers/app-theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppQueryProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </AppQueryProvider>
  );
};

export default Providers;
