import { Module } from "@nestjs/common";

import { RouteNotFoundController } from "./route-not-found.controller";

@Module({
  controllers: [RouteNotFoundController]
})
export class RouteNotFoundModule {}
