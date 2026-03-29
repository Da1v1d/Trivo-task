import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Box, Paper } from "@/shared/components/layout";
import { Text } from "@/shared/components/texts";
import { Alert, CircularProgress, Toast } from "@/shared/components/feedback";
import { DynamicSettingsForm } from "@/features/settings/ui/dynamic-settings-form";
import useAccounts from "@/features/accounts/model/hooks/use-accounts";
import useAccountSettings from "@/features/accounts/model/hooks/use-accounts-settings";
import { useSettingsDefinition } from "@/features/settings/model/hooks/use-settings-definition";
import { normalizeSettingsDefinitionFields } from "@/features/settings/lib/utils";
import type { Account, AccountSettingsValues } from "@/shared/types/accounts";
import BackButton from "@/shared/components/core/back-button";

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
    mutation: { isPending, error, isSuccess, reset },
  } = useAccountSettings(accountId!);

  const handleSubmit = (values: AccountSettingsValues) => {
    updateSettings(values);
  };

  const selectedAccount = accountsData?.find(
    (a: Account) => a.id === accountId,
  );

  const definitionFields = useMemo(
    () => normalizeSettingsDefinitionFields(definitionData),
    [definitionData],
  );

  if (!accountId) {
    return <Navigate to="/accounts" replace />;
  }

  return (
    <Box className="p-2 md:p-4">
      <BackButton />

      <Box className="max-w-3xl mt-4">
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
          <Box className="max-w-2xl space-y-4">
            <Text variant="h5" className="font-semibold">
              {selectedAccount?.name ?? "Account"} — Settings
            </Text>

            {settingsLoading ? (
              <Box className="flex justify-center mt-8">
                <CircularProgress />
              </Box>
            ) : (
              <Paper elevation={0} className="p-6 border border-gray-200">
                <DynamicSettingsForm
                  fields={definitionFields}
                  values={settings}
                  onSubmit={handleSubmit}
                  isSaving={isPending}
                />
              </Paper>
            )}
          </Box>
        )}

        <Toast
          open={isSuccess}
          autoHideDuration={3000}
          onClose={reset}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="success" variant="filled" onClose={reset}>
            Settings saved successfully.
          </Alert>
        </Toast>

        <Toast
          open={!!error}
          autoHideDuration={5000}
          onClose={reset}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="error" variant="filled" onClose={reset}>
            Failed to save settings. Please try again.
          </Alert>
        </Toast>
      </Box>
    </Box>
  );
};

export default AccountsSettings;
