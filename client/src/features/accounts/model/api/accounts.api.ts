import { ApiService } from "@/shared/services/api";
import type {
  AccountsResponse,
  AccountSettingsResponse,
  AccountSettingsValues,
} from "@/shared/types/accounts";

export class AccountsApi {
  public static listAccounts = () =>
    ApiService.get<AccountsResponse>("/accounts");

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
