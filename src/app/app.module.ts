import { Module } from "@nestjs/common";

import { ApiModule } from "./apis/api.module";
import { CoreModule } from "./core/core.module";
import { EnvironmentModule } from "./environments/environment.module";

@Module({
  imports: [EnvironmentModule, CoreModule, ApiModule]
})
export class AppModule {}
