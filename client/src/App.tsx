import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppThemeProvider } from "@/providers/app-theme-provider";
import { AppQueryProvider } from "@/providers/app-query-provider";
import AccountsSettingsPage from "@/pages/accounts-settings-page";
import AccountsListPage from "@/pages/accounts-list-page";

const App = () => {
  return (
    <AppQueryProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/accounts" replace />} />
            <Route path="/accounts" element={<AccountsListPage />} />
            <Route
              path="/accounts/:accountId"
              element={<AccountsSettingsPage />}
            />
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </AppQueryProvider>
  );
};

export default App;
