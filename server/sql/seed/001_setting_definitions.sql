INSERT INTO setting_definitions (key, label, type, default_value, options, is_required, display_order)
VALUES
  ('notifications_enabled', 'Enable notifications', 'boolean', 'false', NULL, false, 1),
  ('support_email', 'Support email', 'text', '"support@example.com"', NULL, true, 2),
  ('daily_email_limit', 'Daily email limit', 'number', '100', NULL, false, 3),
  ('timezone', 'Timezone', 'select', '"utc"',
    '[{"value":"utc","label":"UTC"},{"value":"america_new_york","label":"America / New York"},{"value":"europe_london","label":"Europe / London"},{"value":"asia_tokyo","label":"Asia / Tokyo"}]',
    true, 4),
  ('allowed_channels', 'Allowed channels', 'multiselect', '["email","push"]',
    '[{"value":"email","label":"Email"},{"value":"sms","label":"SMS"},{"value":"push","label":"Push"}]',
    false, 5)
ON CONFLICT (key) DO NOTHING;
