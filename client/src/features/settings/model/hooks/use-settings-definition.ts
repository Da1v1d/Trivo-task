import { useQuery } from "@tanstack/react-query";
import { SettingsApi } from "@/features/settings/model/api/settings-definition.api";

export const useSettingsDefinition = () => {
  return useQuery({
    queryKey: ["settings-definition"],
    queryFn: SettingsApi.getDefinition,
    staleTime: 5 * 60 * 1000,
  });
};
