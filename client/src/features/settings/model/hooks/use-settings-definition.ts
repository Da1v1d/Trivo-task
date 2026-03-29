import { useQuery } from "@tanstack/react-query";
import { delay } from "@/shared/utils/utils";
import { settingsDefinitionMockData } from "@/features/settings/model/data/settings-definition-mock-data";
import type { SettingFieldDefinition } from "@/features/settings/lib/types";

export const useSettingsDefinition = () => {
  return useQuery<SettingFieldDefinition[]>({
    queryKey: ["settings-definition"],
    queryFn: () => delay(400).then(() => settingsDefinitionMockData.data),
    // import { SettingsApi } from "@/features/settings/model/api/settings-definition.api";
    // queryFn: () => SettingsApi.getDefinitions(),
  });
};
