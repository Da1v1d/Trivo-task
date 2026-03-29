import { Navigate, useParams } from "react-router-dom";
import { Box, Paper } from "@/shared/components/layout";
import { Alert, CircularProgress, Toast } from "@/shared/components/feedback";
import { DynamicSettingsForm } from "@/features/settings/ui/blocks/dynamic-settings-form";
import useAccountSettings from "@/features/accounts/model/hooks/use-accounts-settings";
import type { AccountSettingsValues } from "@/features/accounts/lib/types";
import BackButton from "@/shared/components/core/back-button";
import useAccount from "@/features/accounts/model/hooks/use-account";
import AccountPersona from "@/features/accounts/ui/elements/account-persona";

const AccountsSettings = () => {
  const { accountId } = useParams<{ accountId: string }>();

  const accountQuery = useAccount(accountId!);

  const {
    mutation: { isPending, error, isSuccess, reset },
    updateSettings,
    ...accountSettingsQuery
  } = useAccountSettings(accountId!);

  const handleSubmit = (values: AccountSettingsValues) => {
    updateSettings(values);
  };

  const accountData = accountQuery.data;

  if (!accountId) {
    return <Navigate to="/accounts" replace />;
  }

  return (
    <Box className="p-2 md:p-4">
      <BackButton />

      <Box className="max-w-3xl mt-4">
        {accountId && accountSettingsQuery.isLoading && (
          <Box className="flex justify-center mt-12">
            <CircularProgress />
          </Box>
        )}

        {accountId && accountSettingsQuery.isError && (
          <Alert severity="error" className="mt-4">
            Failed to load account settings.
          </Alert>
        )}

        {accountId &&
          accountSettingsQuery.data &&
          !accountSettingsQuery.isLoading && (
            <Box className="max-w-2xl space-y-4">
              <AccountPersona
                name={accountData?.name}
                surname={accountData?.surname}
                image={accountData?.image}
                avatarProps={{
                  className:
                    "size-32 shrink-0 bg-indigo-100 text-sm font-semibold text-indigo-800",
                }}
                textProps={{
                  className: "text-2xl font-semibold",
                }}
              />

              {accountSettingsQuery.isLoading ? (
                <Box className="flex justify-center mt-8">
                  <CircularProgress />
                </Box>
              ) : (
                <Paper elevation={0} className="p-6 border border-gray-200">
                  <DynamicSettingsForm
                    fields={accountSettingsQuery.data}
                    values={Object.fromEntries(
                      accountSettingsQuery.data?.map((setting) => [
                        setting.key,
                        setting.value,
                      ]),
                    )}
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
