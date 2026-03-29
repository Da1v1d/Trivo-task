import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AccountsApi } from "@/features/accounts/model/api/accounts.api";
import type { AccountSettingsValues } from "@/shared/types/accounts";
import { ACCOUNTS_SETTINGS_QUERY_KEY } from "@/features/accounts/lib/constants";
import type { TODO } from "@/shared/types/types";

const useAccountsSettings = (accountId: string, ...props: TODO[]) => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: [ACCOUNTS_SETTINGS_QUERY_KEY, accountId],
    queryFn: () => AccountsApi.getAccountSettings(accountId!),
    enabled: !!accountId,
    ...props,
  });

  const updateMutation = useMutation({
    mutationFn: (values: AccountSettingsValues) =>
      AccountsApi.updateAccountSettings(accountId!, values),
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
