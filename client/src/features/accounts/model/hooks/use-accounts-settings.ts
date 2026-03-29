import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { delay } from "@/shared/utils/utils";
import {
  getMockAccountSettings,
  updateMockAccountSettings,
} from "@/features/accounts/model/data/account-settings-mock-data";
import type { AccountSettingsValues } from "@/shared/types/accounts";
import { ACCOUNTS_SETTINGS_QUERY_KEY } from "@/features/accounts/lib/constants";

const useAccountsSettings = (accountId: string) => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: [ACCOUNTS_SETTINGS_QUERY_KEY, accountId],
    queryFn: () => delay(500).then(() => getMockAccountSettings(accountId)),
    // import { AccountsApi } from "@/features/accounts/model/api/accounts.api";
    // queryFn: () => AccountsApi.getAccountSettings(accountId),
    enabled: !!accountId,
  });

  const updateMutation = useMutation({
    mutationFn: (values: AccountSettingsValues) =>
      delay(350).then(() => updateMockAccountSettings(accountId, values)),
    // mutationFn: (values) => AccountsApi.updateAccountSettings(accountId, values),
    onSuccess: (data) => {
      // we can use queryClient.setQueryData to update the query data
      queryClient.setQueryData([ACCOUNTS_SETTINGS_QUERY_KEY, accountId], data);
      // ! if you need to invalidate the query data, you can use queryClient.invalidateQueries
      // ! to invalidate the query data
      queryClient.invalidateQueries({
        queryKey: [ACCOUNTS_SETTINGS_QUERY_KEY, accountId],
        exact: true,
      });
    },
  });

  return {
    settings: settingsQuery.data?.values,
    updateSettings: updateMutation.mutate,
    // probably we need to separate query and mutation hooks into different files
    // if it's complex logic
    ...settingsQuery,
    mutation: updateMutation,
  };
};

export default useAccountsSettings;
