import { Stack } from "@mui/material";
import { SKELETON_ROWS } from "@/features/accounts/lib/constants";
import { List, ListItemButton } from "@/shared/components/lists";
import { Skeleton } from "@/shared/components/feedback";

const AccountsListSkeleton = () => {
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
};

export default AccountsListSkeleton;
