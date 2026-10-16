import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { environment } from "./environment.loader";
import { EnvironmentService } from "./environment.service";
import { validateEnvironment } from "./environment.validation";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      ignoreEnvFile: true,
      validate: validateEnvironment,
      load: [environment]
    })
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class EnvironmentModule {}
