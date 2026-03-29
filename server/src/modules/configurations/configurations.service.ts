import { Injectable } from "@nestjs/common";
import {
  ConfigurationsRepository,
  SettingDefinitionRow,
  SettingValidation,
} from "@/modules/configurations/configurations.repository";

export interface SettingDefinitionResponse {
  id: string;
  key: string;
  label: string;
  type: string;
  defaultValue: unknown;
  options: unknown;
  validation: SettingValidation | null;
  displayOrder: number;
}

@Injectable()
export class ConfigurationsService {
  constructor(
    private readonly configurationsRepository: ConfigurationsRepository,
  ) {}

  async getAllSettings(): Promise<SettingDefinitionResponse[]> {
    const rows = await this.configurationsRepository.findAllSettings();
    return rows.map(this.toResponse);
  }

  private toResponse(row: SettingDefinitionRow): SettingDefinitionResponse {
    return {
      id: row.id,
      key: row.key,
      label: row.label,
      type: row.type,
      defaultValue: row.default_value,
      options: row.options,
      validation: row.validation,
      displayOrder: row.display_order,
    };
  }
}
