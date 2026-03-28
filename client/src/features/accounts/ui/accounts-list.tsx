import { List, ListItemButton, ListItemText } from "@/shared/components/lists";
import { Typography } from "@/shared/components/texts";
import { Alert, Skeleton } from "@/shared/components/feedback";
import { useNavigate } from "react-router-dom";
import useAccounts from "@/features/accounts/model/hooks/use-accounts";

const AccountsList = () => {
  const navigate = useNavigate();

  const accountsQuery = useAccounts();

  if (accountsQuery.isError) {
    return <Alert severity="error">Failed to load accounts.</Alert>;
  }

  return (
    <div>
      <Typography
        variant="subtitle2"
        className="px-4 pt-4 pb-2 text-gray-500 uppercase tracking-wider"
      >
        Accounts
      </Typography>
      <List disablePadding>
        {accountsQuery.isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ListItemButton key={i} disabled>
                <Skeleton variant="text" width="70%" />
              </ListItemButton>
            ))
          : accountsQuery.data?.accounts.map((account) => (
              <ListItemButton
                key={account.id}
                onClick={() => navigate(`/accounts/${account.id}`)}
                aria-label={`Select account ${account.name}`}
              >
                <ListItemText primary={account.name} />
              </ListItemButton>
            ))}
      </List>
    </div>
  );
};

export default AccountsList;
