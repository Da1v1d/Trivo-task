import { Controller, Get, Param, Query } from "@nestjs/common";
import { GetAccountsQueryDto } from "@/modules/accounts/dto/get-accounts-query.dto";
import { AccountIdParamDto } from "@/modules/accounts/dto/account-id-param.dto";
import { AccountsService } from "@/modules/accounts/accounts.service";

@Controller("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  list(@Query() query: GetAccountsQueryDto) {
    return this.accountsService.list(query);
  }

  @Get(":id")
  findById(@Param() params: AccountIdParamDto) {
    return this.accountsService.findById(params.id);
  }

  @Get(":id/settings")
  getSettings(@Param() params: AccountIdParamDto) {
    return this.accountsService.getAccountSettings(params.id);
  }
}
