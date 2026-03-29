import { useQuery } from "@tanstack/react-query";
import { delay } from "@/shared/utils/utils";
import { settingsDefinitionMockData } from "@/features/settings/model/data/settings-definition-mock-data";

export const useSettingsDefinition = () => {
  return useQuery({
    queryKey: ["settings-definition"],
    queryFn: () => delay(400).then(() => settingsDefinitionMockData),
    // import { SettingsApi } from "@/features/settings/model/api/settings-definition.api";
    // queryFn: () => SettingsApi.getDefinition(),
    staleTime: 5 * 60 * 1000,
  });
};
