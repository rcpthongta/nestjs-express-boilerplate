import { Module } from "@nestjs/common";

import { ApiModule } from "./apis/api.module.js";

@Module({
  imports: [ApiModule]
})
export class AppModule {}
