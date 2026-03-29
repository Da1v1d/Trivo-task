import { Controller, Get } from "@nestjs/common";
import { ConfigurationsService } from "@/modules/configurations/configurations.service";

@Controller("configurations")
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Get("settings")
  async getSettings() {
    const data = await this.configurationsService.getAllSettings();
    return { data };
  }
}
