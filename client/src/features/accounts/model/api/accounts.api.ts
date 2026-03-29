import { ApiService } from "@/shared/services/api";
import type {
  Account,
  AccountSettingsResponse,
  AccountSettingsValues,
} from "@/shared/types/accounts";
import type { PaginationResponse } from "@/shared/types/api";

export class AccountsApi {
  public static getAll = () =>
    ApiService.get<PaginationResponse<Account>>("/accounts");

  public static getAccountSettings = (accountId: string) =>
    ApiService.get<AccountSettingsResponse>(`/accounts/${accountId}/settings`);

  public static updateAccountSettings = (
    accountId: string,
    values: AccountSettingsValues,
  ) =>
    ApiService.put<AccountSettingsResponse>(`/accounts/${accountId}/settings`, {
      values,
    });
}
