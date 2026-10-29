import { Global, Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import process from "node:process";

import { environment } from "./environment.loader";
import { EnvironmentService } from "./environment.service";
import { environmentValidate } from "./environment.validation";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      ignoreEnvFile: true,
      load: [environment]
    })
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class EnvironmentModule implements OnModuleInit {
  public onModuleInit(): void {
    environmentValidate(process.env);
  }
}
