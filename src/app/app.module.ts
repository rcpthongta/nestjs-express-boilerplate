import { Module } from "@nestjs/common";

import { ApiModule } from "./apis/api.module";
import { EnvironmentModule } from "./environments/environment.module";

@Module({
  imports: [EnvironmentModule, ApiModule]
})
export class AppModule {}
