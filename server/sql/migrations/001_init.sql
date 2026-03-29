CREATE TABLE IF NOT EXISTS accounts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(255) NOT NULL,
  surname    VARCHAR(255) NOT NULL DEFAULT '',
  image_url  TEXT,
  role       VARCHAR(50)  NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS setting_definitions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key           VARCHAR(255) NOT NULL UNIQUE,
  label         VARCHAR(255) NOT NULL,
  type          VARCHAR(50)  NOT NULL CHECK (type IN ('boolean','text','number','select','multiselect')),
  default_value JSONB,
  options       JSONB,
  is_required   BOOLEAN NOT NULL DEFAULT false,
  display_order INT     NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS account_settings (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id              UUID  NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  setting_definition_id   UUID  NOT NULL REFERENCES setting_definitions(id) ON DELETE CASCADE,
  value                   JSONB NOT NULL,
  UNIQUE (account_id, setting_definition_id)
);

CREATE INDEX IF NOT EXISTS idx_account_settings_account
  ON account_settings (account_id);
