import { Injectable, Inject } from "@nestjs/common";
import { Pool } from "pg";
import { DATABASE_POOL } from "@/database/database.constants";

export interface AccountRow {
  id: string;
  name: string;
  surname: string;
  image_url: string | null;
  role: string;
  created_at: Date;
}

export interface AccountSettingsJoinedRow {
  key: string;
  label: string;
  type: string;
  default_value: unknown;
  options: unknown;
  validation: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  } | null;
  display_order: number;
  value: unknown | null;
}

interface ListParams {
  limit: number;
  offset: number;
  search?: string;
  role?: string;
  sortColumn: string;
  sortOrder: "ASC" | "DESC";
}

@Injectable()
export class AccountsRepository {
  constructor(@Inject(DATABASE_POOL) private readonly pool: Pool) {}

  async findAll(params: ListParams): Promise<AccountRow[]> {
    const { conditions, values } = this.buildWhereClause(params);
    const idx = values.length;

    const sql = `
      SELECT id, name, surname, image_url, role, created_at
      FROM accounts
      ${conditions}
      ORDER BY ${params.sortColumn} ${params.sortOrder}
      LIMIT $${idx + 1} OFFSET $${idx + 2}
    `;

    const result = await this.pool.query<AccountRow>(sql, [
      ...values,
      params.limit,
      params.offset,
    ]);
    return result.rows;
  }

  async countAll(params: Pick<ListParams, "search" | "role">): Promise<number> {
    const { conditions, values } = this.buildWhereClause(params);

    const sql = `SELECT COUNT(*)::int AS total FROM accounts ${conditions}`;
    const result = await this.pool.query<{ total: number }>(sql, values);
    return result.rows[0].total;
  }

  async findById(id: string): Promise<AccountRow | null> {
    const result = await this.pool.query<AccountRow>(
      `SELECT id, name, surname, image_url, role, created_at
       FROM accounts WHERE id = $1`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async findDefinitionIdsByKeys(keys: string[]): Promise<Map<string, string>> {
    if (keys.length === 0) {
      return new Map();
    }
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const sql = `SELECT id, key FROM setting_definitions WHERE key IN (${placeholders})`;
    const result = await this.pool.query<{ id: string; key: string }>(
      sql,
      keys,
    );
    return new Map(result.rows.map((r) => [r.key, r.id]));
  }

  /**
   * Upserts all rows in one transaction.
   */
  async upsertAccountSettingsValues(
    accountId: string,
    rows: { settingDefinitionId: string; value: unknown }[],
  ): Promise<void> {
    if (rows.length === 0) {
      return;
    }
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      for (const row of rows) {
        await client.query(
          `INSERT INTO account_settings (account_id, setting_definition_id, value)
           VALUES ($1, $2, $3::jsonb)
           ON CONFLICT (account_id, setting_definition_id)
           DO UPDATE SET value = EXCLUDED.value`,
          [accountId, row.settingDefinitionId, JSON.stringify(row.value)],
        );
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async findAccountSettingsJoined(
    accountId: string,
  ): Promise<AccountSettingsJoinedRow[]> {
    const sql = `
      SELECT
        sd.key,
        sd.label,
        sd.type,
        sd.default_value,
        sd.options,
        sd.validation,
        sd.display_order,
        acs.value
      FROM setting_definitions sd
      LEFT JOIN account_settings acs
        ON acs.setting_definition_id = sd.id
        AND acs.account_id = $1
      ORDER BY sd.display_order, sd.key
    `;
    const result = await this.pool.query<AccountSettingsJoinedRow>(sql, [
      accountId,
    ]);
    return result.rows;
  }

  private buildWhereClause(params: Pick<ListParams, "search" | "role">) {
    const clauses: string[] = [];
    const values: unknown[] = [];

    if (params.search) {
      values.push(params.search);
      clauses.push(
        `(name ILIKE '%' || $${values.length} || '%' OR surname ILIKE '%' || $${values.length} || '%')`,
      );
    }

    if (params.role) {
      values.push(params.role);
      clauses.push(`role = $${values.length}`);
    }

    const conditions =
      clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";
    return { conditions, values };
  }
}
