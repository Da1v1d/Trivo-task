import { useEffect } from "react";
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import { Box, Paper } from "@/shared/components/layout";
import { Typography } from "@/shared/components/texts";
import { Button } from "@/shared/components/buttons";
import {
  Alert,
  CircularProgress,
  Snackbar,
} from "@/shared/components/feedback";
import { ArrowBackIcon } from "@/shared/components/icons";
import { DynamicSettingsForm } from "@/features/settings/ui/DynamicSettingsForm";
import useAccounts from "@/features/accounts/model/hooks/use-accounts";
import useAccountSettings from "@/features/accounts/model/hooks/use-accounts-settings";
import { useSettingsDefinition } from "@/features/settings/model/hooks/use-settings-definition";
import type { Account, AccountSettingsValues } from "@/shared/types/accounts";

const AccountsSettings = () => {
  const { accountId } = useParams<{ accountId: string }>();

  const { data: accountsData, isError: accountsError } = useAccounts();
  const {
    data: definitionData,
    isLoading: defLoading,
    isError: defError,
  } = useSettingsDefinition();
  const {
    settings,
    isLoading: settingsLoading,
    isError: settingsError,
    updateSettings,
    isSaving,
    isSuccess,
    saveError,
    resetSaveState,
  } = useAccountSettings(accountId);

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(resetSaveState, 3000);
    return () => clearTimeout(timer);
  }, [isSuccess, resetSaveState]);

  const handleSubmit = (values: AccountSettingsValues) => {
    updateSettings(values);
  };

  const selectedAccount = accountsData?.find(
    (a: Account) => a.id === accountId,
  );

  if (!accountId) {
    return <Navigate to="/accounts" replace />;
  }

  return (
    <Box className="p-6 md:p-8">
      <Button
        component={RouterLink}
        to="/accounts"
        startIcon={<ArrowBackIcon aria-hidden />}
        className="mb-6"
        aria-label="Back to accounts list"
      >
        All accounts
      </Button>

      <Box className="max-w-3xl">
        {accountsError && (
          <Alert severity="warning" className="mb-4">
            Could not load account name. Settings may still load.
          </Alert>
        )}

        {accountId && defLoading && (
          <Box className="flex justify-center mt-12">
            <CircularProgress />
          </Box>
        )}

        {accountId && defError && (
          <Alert severity="error" className="mt-4">
            Failed to load settings definition.
          </Alert>
        )}

        {accountId && settingsError && (
          <Alert severity="error" className="mt-4">
            Failed to load account settings.
          </Alert>
        )}

        {accountId && definitionData && !defLoading && (
          <Box className="max-w-2xl">
            <Typography variant="h5" className="mb-6 font-semibold">
              {selectedAccount?.name ?? "Account"} — Settings
            </Typography>

            {settingsLoading ? (
              <Box className="flex justify-center mt-8">
                <CircularProgress />
              </Box>
            ) : (
              <Paper elevation={0} className="p-6 border border-gray-200">
                <DynamicSettingsForm
                  fields={definitionData.fields}
                  values={settings}
                  onSubmit={handleSubmit}
                  isSaving={isSaving}
                />
              </Paper>
            )}
          </Box>
        )}

        <Snackbar
          open={isSuccess}
          autoHideDuration={3000}
          onClose={resetSaveState}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="success" variant="filled" onClose={resetSaveState}>
            Settings saved successfully.
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!saveError}
          autoHideDuration={5000}
          onClose={resetSaveState}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="error" variant="filled" onClose={resetSaveState}>
            Failed to save settings. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AccountsSettings;
