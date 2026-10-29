import { Module } from "@nestjs/common";

import { RouteNotFoundController } from "./route-not-fount.controller";

@Module({
  controllers: [RouteNotFoundController]
})
export class RouteNotFoundModule {}
