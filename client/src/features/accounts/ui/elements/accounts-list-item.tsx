import { getAccountInitials } from "@/features/accounts/lib/utils";
import { Avatar } from "@/shared/components/avatars";
import { Stack } from "@/shared/components/layout";
import { ListItemButton, ListItemText } from "@/shared/components/lists";
import type { Account } from "@/shared/types/accounts";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  id: Account["id"];
  name: Account["name"];
};

const AccountsListItem = ({ id, name }: Props) => {
  const navigate = useNavigate();

  const navigationHandler = () => () => {
    navigate(`/accounts/${id}`);
  };

  return (
    <ListItemButton
      key={id}
      onClick={navigationHandler()}
      aria-label={`Open settings for ${name}`}
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
          {getAccountInitials(name)}
        </Avatar>
        <ListItemText
          className="min-w-0"
          primary={name}
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
  );
};

export default AccountsListItem;
