import type { SettingFieldDefinition } from "@/features/settings/lib/types";

export type AccountRole = "admin" | "user";

export type Account = {
  id: string;
  name: string;
  surname: string;
  image: string | null;
  role: AccountRole;
};

export type AccountSettingsValues = Record<string, unknown>;

export type MergedAccountSetting = SettingFieldDefinition;
