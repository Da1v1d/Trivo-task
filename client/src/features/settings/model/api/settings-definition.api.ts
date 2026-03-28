import { ApiService } from "@/shared/services/api";
import type { SettingsDefinitionResponse } from "@/shared/types/settings-definition";

export class SettingsApi {
  public static getDefinition = () =>
    ApiService.get<SettingsDefinitionResponse>("/settings/definition");
}
