import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/database/database.module";
import { AccountsController } from "@/modules/accounts/accounts.controller";
import { AccountsService } from "@/modules/accounts/accounts.service";
import { AccountsRepository } from "@/modules/accounts/accounts.repository";

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
})
export class AccountsModule {}
