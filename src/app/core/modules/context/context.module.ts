import { Module } from "@nestjs/common";

import { ContextConfiguration } from "./context.configuration";

@Module({
  providers: [ContextConfiguration],
  exports: [ContextConfiguration]
})
export class ContextModule {}
