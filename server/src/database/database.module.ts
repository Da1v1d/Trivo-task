import { Module, OnModuleDestroy, Inject } from "@nestjs/common";
import { Pool } from "pg";
import { databaseProvider } from "@/database/database.provider";
import { DATABASE_POOL } from "@/database/database.constants";

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(DATABASE_POOL) private readonly pool: Pool) {}

  async onModuleDestroy() {
    await this.pool.end();
  }
}
