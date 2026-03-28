import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppThemeProvider } from "@/providers/app-theme-provider";
import { AppQueryProvider } from "@/providers/app-query-provider";
import AccountsSettingsPage from "@/pages/accounts-settings-page";
import AccountsListPage from "@/pages/accounts-list-page";
import { PageLayout } from "@/shared/components/core/page-layout";

const App = () => {
  return (
    <AppQueryProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/accounts" replace />} />
            <Route element={<PageLayout />}>
              <Route path="/accounts" element={<AccountsListPage />} />
              <Route
                path="/accounts/:accountId"
                element={<AccountsSettingsPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </AppQueryProvider>
  );
};

export default App;
