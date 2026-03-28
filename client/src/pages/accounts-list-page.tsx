import { Box, Paper } from "@/shared/components/layout";
import { Typography } from "@/shared/components/texts";
import AccountsList from "@/features/accounts/ui/accounts-list";

const AccountsListPage = () => {
  return (
    <Box className="p-2 md:p-4">
      <Typography variant="h4" component="h1" className="mb-2 font-semibold">
        Accounts
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-6">
        Choose an account to open its settings.
      </Typography>

      <Paper
        elevation={2}
        className="max-w-md overflow-hidden border border-gray-200"
      >
        <AccountsList />
      </Paper>
    </Box>
  );
};

export default AccountsListPage;
