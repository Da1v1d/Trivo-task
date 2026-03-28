import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AccountsApi } from "@/features/accounts/model/api/accounts.api";
import type { AccountSettingsValues } from "@/shared/types/accounts";

const useAccountsSettings = (accountId: string | undefined) => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ["account-settings", accountId],
    queryFn: () => AccountsApi.getAccountSettings(accountId!),
    enabled: !!accountId,
  });

  const updateMutation = useMutation({
    mutationFn: (values: AccountSettingsValues) =>
      AccountsApi.updateAccountSettings(accountId!, values),
    onSuccess: (data) => {
      queryClient.setQueryData(["account-settings", accountId], data);
    },
  });

  return {
    settings: settingsQuery.data?.values,
    isLoading: settingsQuery.isLoading,
    isError: settingsQuery.isError,
    error: settingsQuery.error,
    updateSettings: updateMutation.mutate,
    isSaving: updateMutation.isPending,
    saveError: updateMutation.error,
    isSuccess: updateMutation.isSuccess,
    resetSaveState: updateMutation.reset,
  };
};

export default useAccountsSettings;
