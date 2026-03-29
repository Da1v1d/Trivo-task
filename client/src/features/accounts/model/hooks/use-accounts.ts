import { queryOptions, useQuery } from "@tanstack/react-query";
import { ACCOUNTS_QUERY_KEY } from "@/features/accounts/lib/constants";
import { AccountsApi } from "@/features/accounts/model/api/accounts.api";
import type { AccountsRequest } from "@/features/accounts/lib/types";

// With tanstack query we have two approaaches for data fetching:
// 1. with custom hooks e.g. useAccounts
// 2. with queryOptions - then in component we use useQuery(getAccountsQueryOptions())

export const getAccountsQueryOptions = () =>
  queryOptions({
    queryKey: [ACCOUNTS_QUERY_KEY],
    queryFn: () => AccountsApi.getAll,
  });

const useAccounts = ({ page, limit }: Partial<AccountsRequest> = {}) => {
  return useQuery({
    queryKey: [ACCOUNTS_QUERY_KEY, page, limit],
    // queryFn: () => delay(1000).then(() => accountsMockData),
    queryFn: () => AccountsApi.getAll({ page, limit }),
  });
};

export default useAccounts;
