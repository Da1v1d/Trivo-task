import { List } from "@/shared/components/lists";
import { Box } from "@/shared/components/layout";
import { Text } from "@/shared/components/texts";
import useAccounts from "@/features/accounts/model/hooks/use-accounts";
import { ACCOUNTS_PER_PAGE } from "@/features/accounts/lib/constants";
import AccountsListSkeleton from "@/features/accounts/ui/blocks/accounts-list-skeleton";
import AccountsListError from "@/features/accounts/ui/blocks/accounts-list-error";
import AccountsListNoData from "@/features/accounts/ui/blocks/accounts-list-no-data";
import AccountsListPagination from "@/features/accounts/ui/blocks/accounts-list-pagination";
import AccountsListItem from "@/features/accounts/ui/elements/accounts-list-item";
import { useState } from "react";

const AccountsList = () => {
  const [page, setPage] = useState(1);
  const accountsQuery = useAccounts({ page, limit: ACCOUNTS_PER_PAGE });

  if (accountsQuery.isError) {
    return <AccountsListError />;
  }

  console.log(accountsQuery.isLoading);

  if (accountsQuery.isLoading) {
    return <AccountsListSkeleton />;
  }

  const payload = accountsQuery.data;
  const accounts = payload?.data ?? [];
  const total = payload?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / ACCOUNTS_PER_PAGE));

  if (total === 0) {
    return <AccountsListNoData />;
  }

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <Box className="w-full">
      <Box className="border-b border-gray-200 bg-slate-50/90 px-4 py-3">
        <Text
          variant="subtitle2"
          color="text.secondary"
          className="font-medium"
        >
          {total} {total === 1 ? "account" : "accounts"}
          {pageCount > 1 ? (
            <span className="text-gray-500">
              {" "}
              · page {page} of {pageCount}
            </span>
          ) : null}
        </Text>
      </Box>
      <List disablePadding className="w-full">
        {accounts.map((account) => (
          <AccountsListItem
            key={account.id}
            id={account.id}
            name={account.name}
            surname={account.surname}
            image={account.image}
          />
        ))}
      </List>
      <AccountsListPagination
        page={page}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        disabled={accountsQuery.isFetching}
      />
    </Box>
  );
};

export default AccountsList;
