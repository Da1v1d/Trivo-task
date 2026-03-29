import { ACCOUNT_QUERY_KEY } from "@/features/accounts/lib/constants";
import { AccountsApi } from "@/features/accounts/model/api/accounts.api";
import { useQuery } from "@tanstack/react-query";

const useAccount = (accountId: string) => {
  return useQuery({
    queryKey: [ACCOUNT_QUERY_KEY, accountId],
    queryFn: () => AccountsApi.getById(accountId),
  });
};

export default useAccount;
