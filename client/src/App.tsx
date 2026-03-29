import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AccountsSettingsPage from "@/pages/accounts-settings-page";
import AccountsListPage from "@/pages/accounts-list-page";
import { PageLayout } from "@/shared/components/core/page-layout";
import Providers from "@/providers";

const App = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/accounts" replace />} />
          <Route path="/accounts" element={<PageLayout />}>
            <Route index element={<AccountsListPage />} />
            <Route path=":accountId" element={<AccountsSettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
