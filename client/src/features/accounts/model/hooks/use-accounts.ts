import { queryOptions, useQuery } from "@tanstack/react-query";
import { delay } from "@/shared/utils/utils";
import { accountsMockData } from "@/features/accounts/model/data/accounts-mock-data";
import { ACCOUNTS_QUERY_KEY } from "@/features/accounts/lib/constants";
import { AccountsApi } from "@/features/accounts/model/api/accounts.api";

// With tanstack query we have two approaaches for data fetching:
// 1. with custom hooks e.g. useAccounts
// 2. with queryOptions - then in component we use useQuery(getAccountsQueryOptions())

export const getAccountsQueryOptions = () =>
  queryOptions({
    queryKey: [ACCOUNTS_QUERY_KEY],
    queryFn: AccountsApi.listAccounts,
  });

const useAccounts = () => {
  return useQuery({
    queryKey: [ACCOUNTS_QUERY_KEY],
    queryFn: () => delay(1000).then(() => accountsMockData),
    // queryFn: AccountsApi.listAccounts,
  });
};

export default useAccounts;
