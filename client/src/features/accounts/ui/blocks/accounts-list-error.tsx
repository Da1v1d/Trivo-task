import { Alert, Box } from "@mui/material";

const AccountsListError = () => {
  return (
    <Box className="p-4">
      <Alert severity="error">
        Failed to load accounts. Please try again later.
      </Alert>
    </Box>
  );
};

export default AccountsListError;
