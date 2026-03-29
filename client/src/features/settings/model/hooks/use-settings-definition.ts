import { useQuery } from "@tanstack/react-query";

import { SettingsApi } from "@/features/settings/model/api/settings-definition.api";
import { SETTINGS_DEFINITION_QUERY_KEY } from "@/features/settings/lib/constants";

// no need in client side for now
export const useSettingsDefinition = () => {
  return useQuery({
    queryKey: [SETTINGS_DEFINITION_QUERY_KEY],
    // queryFn: () => delay(400).then(() => settingsDefinitionMockData.data),
    // import { SettingsApi } from "@/features/settings/model/api/settings-definition.api";
    queryFn: SettingsApi.getDefinitions,
  });
};
