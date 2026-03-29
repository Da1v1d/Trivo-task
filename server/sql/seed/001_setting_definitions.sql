INSERT INTO setting_definitions (key, label, type, default_value, options, validation, display_order)
VALUES
  ('notifications_enabled', 'Enable notifications', 'boolean', 'false', NULL, NULL, 1),
  ('support_email', 'Support email', 'text', '"support@example.com"', NULL,
    '{"required": true, "pattern": "^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$"}', 2),
  ('daily_email_limit', 'Daily email limit', 'number', '100', NULL,
    '{"min": 1, "max": 10000}', 3),
  ('timezone', 'Timezone', 'select', '"utc"',
    '[{"value":"utc","label":"UTC"},{"value":"america_new_york","label":"America / New York"},{"value":"europe_london","label":"Europe / London"},{"value":"asia_tokyo","label":"Asia / Tokyo"}]',
    '{"required": true}', 4),
  ('allowed_channels', 'Allowed channels', 'multiselect', '["email","push"]',
    '[{"value":"email","label":"Email"},{"value":"sms","label":"SMS"},{"value":"push","label":"Push"}]',
    NULL, 5)
ON CONFLICT (key) DO UPDATE SET validation = EXCLUDED.validation;
