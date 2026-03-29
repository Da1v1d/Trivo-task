import { ApiService } from "@/shared/services/api";
import type {
  Account,
  AccountSettingsValues,
  MergedAccountSetting,
} from "@/features/accounts/lib/types";
import type { ApiResponse, PaginationResponse } from "@/shared/types/api";

export class AccountsApi {
  public static getAll = () =>
    ApiService.get<PaginationResponse<Account>>("/accounts");

  public static getById = (accountId: string) =>
    ApiService.get<ApiResponse<Account>>(`/accounts/${accountId}`);

  /** `GET /accounts/:id/settings` — merged definitions + values (not a flat `values` map). */
  public static getSettings = (accountId: string) =>
    ApiService.get<ApiResponse<MergedAccountSetting[]>>(
      `/accounts/${accountId}/settings`,
    );

  public static updateSettings = (
    accountId: string,
    values: AccountSettingsValues,
  ) =>
    ApiService.put<ApiResponse<MergedAccountSetting[]>>(
      `/accounts/${accountId}/settings`,
      values,
    );
}
