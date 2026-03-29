import { IsObject } from "class-validator";

/** Body shape matches client: `{ values: { [settingKey]: value } }`. */
export class UpdateAccountSettingsDto {
  @IsObject()
  values!: Record<string, unknown>;
}
