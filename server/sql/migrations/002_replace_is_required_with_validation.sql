ALTER TABLE setting_definitions
  ADD COLUMN IF NOT EXISTS validation JSONB;

ALTER TABLE setting_definitions
  DROP COLUMN IF EXISTS is_required;
