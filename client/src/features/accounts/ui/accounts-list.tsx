import { List, ListItemButton, ListItemText } from "@/shared/components/lists";
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
      <List disablePadding>
        {accountsQuery.isLoading
          ? // ai suggested trash )
            Array.from({ length: 4 }).map((_, i) => (
              <ListItemButton key={i} disabled>
                <Skeleton variant="text" width="70%" />
              </ListItemButton>
            ))
          : accountsQuery.data?.map((account) => (
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
