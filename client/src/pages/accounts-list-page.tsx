import { Box, Paper, Stack } from "@/shared/components/layout";
import AccountsList from "@/features/accounts/ui/accounts-list";
import { Text } from "@/shared/components/texts";

const AccountsListPage = () => {
  return (
    <Box className="p-2 md:p-4" display="flex" flexDirection="column" gap={2}>
      <Stack>
        <Text variant="h4" component="h1" className="font-semibold">
          Accounts
        </Text>
        <Text variant="body2" color="text.secondary" className="">
          Choose an account to open its settings.
        </Text>
      </Stack>

      <Paper elevation={2} className="overflow-hidden border border-gray-200">
        <AccountsList />
      </Paper>
    </Box>
  );
};

export default AccountsListPage;
