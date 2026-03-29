import { Injectable, Inject } from "@nestjs/common";
import { Pool } from "pg";
import { DATABASE_POOL } from "@/database/database.constants";

export interface SettingDefinitionRow {
  id: string;
  key: string;
  label: string;
  type: string;
  default_value: unknown;
  options: unknown;
  is_required: boolean;
  display_order: number;
}

@Injectable()
export class ConfigurationsRepository {
  constructor(@Inject(DATABASE_POOL) private readonly pool: Pool) {}

  async findAllSettings(): Promise<SettingDefinitionRow[]> {
    const sql = `
      SELECT id, key, label, type, default_value, options, is_required, display_order
      FROM setting_definitions
      ORDER BY display_order, key
    `;
    const result = await this.pool.query<SettingDefinitionRow>(sql);
    return result.rows;
  }
}
