import { useQuery } from "@tanstack/react-query";
import { delay } from "@/shared/utils/utils";
import { accountsMockData } from "@/features/accounts/model/data/accounts-mock-data";

const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => delay(1000).then(() => accountsMockData),
    // queryFn: AccountsApi.listAccounts,
  });
};

export default useAccounts;
