import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { GetAccountsQueryDto } from "@/modules/accounts/dto/get-accounts-query.dto";
import { AccountIdParamDto } from "@/modules/accounts/dto/account-id-param.dto";
import { UpdateAccountSettingsDto } from "@/modules/accounts/dto/update-account-settings.dto";
import { AccountsService } from "@/modules/accounts/accounts.service";

@Controller("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  list(@Query() query: GetAccountsQueryDto) {
    return this.accountsService.list(query);
  }

  @Get(":id")
  async findById(@Param() params: AccountIdParamDto) {
    const data = await this.accountsService.findById(params.id);
    return { data };
  }

  @Get(":id/settings")
  async getSettings(@Param() params: AccountIdParamDto) {
    const data = await this.accountsService.getAccountSettings(params.id);
    return { data };
  }

  @Put(":id/settings")
  async updateSettings(
    @Param() params: AccountIdParamDto,
    @Body() body: UpdateAccountSettingsDto,
  ) {
    const data = await this.accountsService.updateAccountSettings(
      params.id,
      body,
    );
    return { data };
  }
}
