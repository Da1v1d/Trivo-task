export type Account = {
  id: string;
  name: string;
};

export type AccountsResponse = {
  accounts: Account[];
};

export type AccountSettingsValues = Record<string, unknown>;

export type AccountSettingsResponse = {
  values: AccountSettingsValues;
};
