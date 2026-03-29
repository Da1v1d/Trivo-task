import { Injectable, Inject } from "@nestjs/common";
import { Pool } from "pg";
import { DATABASE_POOL } from "@/database/database.constants";

export interface SettingValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface SettingDefinitionRow {
  id: string;
  key: string;
  label: string;
  type: string;
  default_value: unknown;
  options: unknown;
  validation: SettingValidation | null;
  display_order: number;
}

@Injectable()
export class ConfigurationsRepository {
  constructor(@Inject(DATABASE_POOL) private readonly pool: Pool) {}

  async findAllSettings(): Promise<SettingDefinitionRow[]> {
    const sql = `
      SELECT id, key, label, type, default_value, options, validation, display_order
      FROM setting_definitions
      ORDER BY display_order, key
    `;
    const result = await this.pool.query<SettingDefinitionRow>(sql);
    return result.rows;
  }
}
