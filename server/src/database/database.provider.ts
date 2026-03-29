import { Pool } from "pg";
import { ConfigService } from "@nestjs/config";
import { DATABASE_POOL } from "@/database/database.constants";

export const databaseProvider = {
  provide: DATABASE_POOL,
  inject: [ConfigService],
  useFactory: (config: ConfigService): Pool => {
    return new Pool({
      connectionString: config.get<string>("DATABASE_URL"),
    });
  },
};
