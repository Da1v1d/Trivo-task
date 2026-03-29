import { ApiService } from "@/shared/services/api";
import type { BaseApiResponse } from "@/shared/types/api";
import type { SettingFieldDefinition } from "@/features/settings/lib/types";

export class SettingsApi {
  public static getDefinition = () =>
    ApiService.get<BaseApiResponse<SettingFieldDefinition[]>>(
      "/settings/definition",
    );
}
