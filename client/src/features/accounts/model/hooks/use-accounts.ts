import { useQuery } from "@tanstack/react-query";
import { AccountsApi } from "@/features/accounts/model/api/accounts.api";

const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: AccountsApi.listAccounts,
  });
};

export default useAccounts;
