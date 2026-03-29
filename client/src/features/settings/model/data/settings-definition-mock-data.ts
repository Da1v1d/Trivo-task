import type { SettingsDefinitionResponse } from "@/features/settings/lib/types";

/** Mirrors assignment examples: notifications, support email, limits, timezone, channels. */
export const settingsDefinitionMockData: SettingsDefinitionResponse = {
  fields: [
    {
      key: "notifications_enabled",
      type: "boolean",
      label: "Enable notifications",
    },
    {
      key: "support_email",
      type: "text",
      label: "Support email",
      validation: {
        required: true,
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      },
    },
    {
      key: "daily_email_limit",
      type: "number",
      label: "Daily email limit",
      validation: { min: 0, max: 1000 },
    },
    {
      key: "timezone",
      type: "select",
      label: "Timezone",
      validation: { required: true },
      options: [
        { value: "utc", label: "UTC" },
        { value: "america_new_york", label: "America / New York" },
        { value: "europe_london", label: "Europe / London" },
        { value: "asia_tokyo", label: "Asia / Tokyo" },
      ],
    },
    {
      key: "allowed_channels",
      type: "multiselect",
      label: "Allowed channels",
      options: [
        { value: "email", label: "Email" },
        { value: "sms", label: "SMS" },
        { value: "push", label: "Push" },
      ],
    },
  ],
};
