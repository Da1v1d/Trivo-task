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
  is_required: boolean;
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
        sd.is_required,
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
