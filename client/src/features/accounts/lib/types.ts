export type AccountRole = "admin" | "user";

export type Account = {
  id: string;
  name: string;
  surname: string;
  image: string;
  role: AccountRole;
};

export type AccountSettingsValues = Record<string, unknown>;
