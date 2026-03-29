import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/database/database.module";
import { ConfigurationsController } from "@/modules/configurations/configurations.controller";
import { ConfigurationsRepository } from "@/modules/configurations/configurations.repository";
import { ConfigurationsService } from "@/modules/configurations/configurations.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService, ConfigurationsRepository],
})
export class ConfigurationsModule {}
