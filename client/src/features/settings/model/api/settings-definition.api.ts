import { ApiService } from "@/shared/services/api";
import type { SettingsDefinitionResponse } from "@/features/settings/lib/types";

export class SettingsApi {
  public static getDefinition = () =>
    ApiService.get<SettingsDefinitionResponse>("/settings/definition");
}
