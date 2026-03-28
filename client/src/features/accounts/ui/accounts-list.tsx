import { List, ListItemButton, ListItemText } from "@/shared/components/lists";
import { Alert, Skeleton } from "@/shared/components/feedback";
import { Box, Stack } from "@/shared/components/layout";
import { Avatar } from "@/shared/components/avatars";
import { Text } from "@/shared/components/texts";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import useAccounts from "@/features/accounts/model/hooks/use-accounts";
import { getAccountInitials } from "@/features/accounts/lib/get-account-initials";

const SKELETON_ROWS = 5;

const AccountsList = () => {
  const navigate = useNavigate();
  const accountsQuery = useAccounts();

  if (accountsQuery.isError) {
    return (
      <Box className="p-4">
        <Alert severity="error">
          Failed to load accounts. Please try again later.
        </Alert>
      </Box>
    );
  }

  if (accountsQuery.isLoading) {
    return (
      <List disablePadding className="w-full">
        {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
          <ListItemButton
            key={i}
            disabled
            className="border-b border-gray-100 py-4 last:border-b-0"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              className="w-full min-w-0"
            >
              <Skeleton variant="circular" width={44} height={44} />
              <Stack className="min-w-0 flex-1" spacing={0.5}>
                <Skeleton variant="text" width="55%" height={22} />
                <Skeleton variant="text" width="35%" height={16} />
              </Stack>
              <Skeleton variant="rounded" width={24} height={24} />
            </Stack>
          </ListItemButton>
        ))}
      </List>
    );
  }

  const accounts = accountsQuery.data ?? [];

  if (accounts.length === 0) {
    return (
      <Box className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
        <Text variant="subtitle1" className="font-medium text-gray-800">
          No accounts yet
        </Text>
        <Text variant="body2" color="text.secondary" className="max-w-xs">
          When accounts are available, they will appear in this list.
        </Text>
      </Box>
    );
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
          <ListItemButton
            key={account.id}
            onClick={() => navigate(`/accounts/${account.id}`)}
            aria-label={`Open settings for ${account.name}`}
            className="border-b border-gray-100 py-3 transition-colors hover:bg-indigo-50/70 focus-visible:bg-indigo-50/70 last:border-b-0"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              className="w-full min-w-0"
            >
              <Avatar
                className="h-11 w-11 shrink-0 bg-indigo-100 text-sm font-semibold text-indigo-800"
                aria-hidden
              >
                {getAccountInitials(account.name)}
              </Avatar>
              <ListItemText
                className="min-w-0"
                primary={account.name}
                secondary="View and edit settings"
                slotProps={{
                  primary: {
                    className: "font-medium text-gray-900 truncate",
                  },
                  secondary: {
                    className: "text-xs text-gray-500 mt-0.5",
                  },
                }}
              />
              <ChevronRightIcon
                className="shrink-0 text-gray-400"
                fontSize="small"
                aria-hidden
              />
            </Stack>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default AccountsList;
