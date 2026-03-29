import { ApiService } from "@/shared/services/api";
import type {
  Account,
  AccountSettingsValues,
} from "@/features/accounts/lib/types";
import type { PaginationResponse } from "@/shared/types/api";

export class AccountsApi {
  public static getAll = () =>
    ApiService.get<PaginationResponse<Account>>("/accounts");

  public static getById = (accountId: string) =>
    ApiService.get<Account>(`/accounts/${accountId}`);

  public static getSettingsValues = (accountId: string) =>
    ApiService.get<AccountSettingsValues>(`/accounts/${accountId}/settings`);

  public static updateAccountSettings = (
    accountId: string,
    values: AccountSettingsValues,
  ) =>
    ApiService.put<AccountSettingsValues>(`/accounts/${accountId}/settings`, {
      values,
    });
}
