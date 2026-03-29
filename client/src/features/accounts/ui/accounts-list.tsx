import { List } from "@/shared/components/lists";
import { Box } from "@/shared/components/layout";
import { Text } from "@/shared/components/texts";
import useAccounts from "@/features/accounts/model/hooks/use-accounts";
import AccountsListSkeleton from "@/features/accounts/ui/blocks/accounts-list-skeleton";
import AccountsListError from "@/features/accounts/ui/blocks/accounts-list-error";
import AccountsListNoData from "@/features/accounts/ui/blocks/accounts-list-no-data";
import AccountsListItem from "@/features/accounts/ui/elements/accounts-list-item";

const AccountsList = () => {
  const accountsQuery = useAccounts();

  if (accountsQuery.isError) {
    return <AccountsListError />;
  }

  if (accountsQuery.isLoading) {
    return <AccountsListSkeleton />;
  }

  const accounts = accountsQuery.data?.data ?? [];

  if (accounts.length === 0) {
    return <AccountsListNoData />;
  }

  return (
    <Box className="w-full">
      <Box className="border-b border-gray-200 bg-slate-50/90 px-4 py-3">
        <Text
          variant="subtitle2"
          color="text.secondary"
          className="font-medium"
        >
          {accounts.length} {accounts.length === 1 ? "account" : "accounts"}
        </Text>
      </Box>
      <List disablePadding className="w-full">
        {accounts.map((account) => (
          <AccountsListItem
            key={account.id}
            id={account.id}
            name={account.name}
          />
        ))}
      </List>
    </Box>
  );
};

export default AccountsList;
