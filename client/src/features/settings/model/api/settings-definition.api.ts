import type { SettingFieldDefinition } from "@/features/settings/lib/types";
import { ApiService } from "@/shared/services/api";
import type { ApiResponse } from "@/shared/types/api";

export class SettingsApi {
  /** `GET /configurations/settings` — setting definitions. */
  public static getDefinitions = () =>
    ApiService.get<ApiResponse<SettingFieldDefinition[]>>(
      "/configurations/settings",
    );
}
