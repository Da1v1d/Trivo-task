import type { Account } from "@/features/accounts/lib/types";
import { getAccountInitials } from "@/features/accounts/lib/utils";
import { Avatar } from "@/shared/components/avatars";
import { Stack } from "@/shared/components/layout";
import { Text } from "@/shared/components/texts";
import type { ComponentProps } from "react";

type Props = Partial<Account> &
  ComponentProps<typeof Stack> & {
    avatarProps?: Omit<ComponentProps<typeof Avatar>, "src">;
    textProps?: ComponentProps<typeof Text>;
  };

const AccountPersona = ({
  name,
  surname,
  image,
  avatarProps,
  textProps,
  ...props
}: Props) => {
  const fullName = `${name} ${surname}`;
  const initials = image ? null : getAccountInitials(fullName);

  return (
    <Stack direction="row" alignItems="center" spacing={2} {...props}>
      <Avatar src={image ?? undefined} {...avatarProps}>
        {initials}
      </Avatar>
      <Text variant="body1" {...textProps}>
        {name} {surname}
      </Text>
    </Stack>
  );
};

export default AccountPersona;
