import type {
  AccountSettingsResponse,
  AccountSettingsValues,
} from "@/shared/types/accounts";
import { accountsMockData } from "@/features/accounts/model/data/accounts-mock-data";

/** Baseline values; keys must match `settingsDefinitionMockData` field keys. */
export const defaultAccountSettingsTemplate: AccountSettingsValues = {
  notifications_enabled: true,
  support_email: "support@example.com",
  daily_email_limit: 100,
  timezone: "utc",
  allowed_channels: ["email", "push"],
};

const buildSeededStore = (): Record<string, AccountSettingsValues> => {
  const store: Record<string, AccountSettingsValues> = {};

  for (const account of accountsMockData) {
    const id = Number(account.id);
    store[account.id] = {
      notifications_enabled: id % 2 === 1,
      support_email: `support.account${account.id}@example.com`,
      daily_email_limit: Math.min(950, 50 + id * 15),
      timezone: id % 3 === 0 ? "america_new_york" : "utc",
      allowed_channels: id % 2 === 0 ? ["email", "sms"] : ["email"],
    };
  }

  return store;
};

let mockAccountSettingsById: Record<string, AccountSettingsValues> =
  buildSeededStore();

export const resetAccountSettingsMockStore = (): void => {
  mockAccountSettingsById = buildSeededStore();
};

const valuesForUnknownAccount = (accountId: string): AccountSettingsValues => ({
  ...defaultAccountSettingsTemplate,
  support_email: `support.${accountId}@example.com`,
});

export const getMockAccountSettings = (
  accountId: string,
): AccountSettingsResponse => {
  const stored = mockAccountSettingsById[accountId];
  const values = stored
    ? { ...stored }
    : valuesForUnknownAccount(accountId);

  return { values };
};

export const updateMockAccountSettings = (
  accountId: string,
  nextValues: AccountSettingsValues,
): AccountSettingsResponse => {
  const prev =
    mockAccountSettingsById[accountId] ?? valuesForUnknownAccount(accountId);
  const merged = { ...prev, ...nextValues };
  mockAccountSettingsById[accountId] = merged;
  return { values: { ...merged } };
};
