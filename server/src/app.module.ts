import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@/database/database.module";
import { AccountsModule } from "@/modules/accounts/accounts.module";
import { ConfigurationsModule } from "@/modules/configurations/configurations.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AccountsModule,
    ConfigurationsModule,
  ],
})
export class AppModule {}
