import { Injectable, NotFoundException } from "@nestjs/common";
import {
  AccountsRepository,
  AccountRow,
} from "@/modules/accounts/accounts.repository";
import { GetAccountsQueryDto } from "@/modules/accounts/dto/get-accounts-query.dto";

const SORT_WHITELIST: Record<string, string> = {
  name: "name",
  surname: "surname",
  role: "role",
  created_at: "created_at",
};

export interface AccountResponse {
  id: string;
  name: string;
  surname: string;
  image: string | null;
  role: string;
}

export interface MergedAccountSetting {
  key: string;
  type: string;
  label: string;
  options: unknown;
  isRequired: boolean;
  defaultValue: unknown;
  value: unknown;
}

export interface PaginatedAccounts {
  data: AccountResponse[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async list(query: GetAccountsQueryDto): Promise<PaginatedAccounts> {
    const { page, limit, search, role, sortBy, sortOrder } = query;
    const offset = (page - 1) * limit;
    const sortColumn = (sortBy && SORT_WHITELIST[sortBy]) || "created_at";
    const order = sortOrder?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const [rows, total] = await Promise.all([
      this.accountsRepository.findAll({
        limit,
        offset,
        search,
        role,
        sortColumn,
        sortOrder: order as "ASC" | "DESC",
      }),
      this.accountsRepository.countAll({ search, role }),
    ]);

    return {
      data: rows.map(this.toAccountResponse),
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<AccountResponse> {
    const row = await this.accountsRepository.findById(id);
    if (!row) {
      throw new NotFoundException(`Account ${id} not found`);
    }
    return this.toAccountResponse(row);
  }

  async getAccountSettings(accountId: string): Promise<MergedAccountSetting[]> {
    const account = await this.accountsRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account ${accountId} not found`);
    }

    const rows =
      await this.accountsRepository.findAccountSettingsJoined(accountId);

    return rows.map((row) => ({
      key: row.key,
      type: row.type,
      label: row.label,
      options: row.options,
      isRequired: row.is_required,
      defaultValue: row.default_value,
      value: row.value ?? row.default_value,
    }));
  }

  private toAccountResponse(row: AccountRow): AccountResponse {
    return {
      id: row.id,
      name: row.name,
      surname: row.surname,
      image: row.image_url,
      role: row.role,
    };
  }
}
