import { Button } from "@/shared/components/buttons";
import { Box } from "@/shared/components/layout";

const AccountsListPagination = () => {
  return (
    <Box className="flex justify-end">
      <Button variant="contained" color="primary">
        Next
      </Button>
    </Box>
  );
};

export default AccountsListPagination;
