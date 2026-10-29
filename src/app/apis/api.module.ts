import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { ExampleModule } from "./examples/example.module";
import { RouteNotFoundModule } from "./route-not-fount/route-not-fount.module";

@Module({
  imports: [
    ExampleModule,
    RouteNotFoundModule,
    RouterModule.register([
      {
        path: "examples",
        module: ExampleModule
      },
      {
        path: "*path",
        module: RouteNotFoundModule
      }
    ])
  ]
})
export class ApiModule {}
