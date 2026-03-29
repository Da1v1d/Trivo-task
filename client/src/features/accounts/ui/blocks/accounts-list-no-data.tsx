import { Box } from "@/shared/components/layout";
import { Text } from "@/shared/components/texts";

const AccountsListNoData = () => {
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
};

export default AccountsListNoData;
