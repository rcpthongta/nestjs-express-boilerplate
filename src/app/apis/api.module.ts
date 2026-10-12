import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { ExampleModule } from "./examples";

@Module({
  imports: [
    ExampleModule,
    RouterModule.register([
      {
        path: "examples",
        module: ExampleModule
      }
    ])
  ]
})
export class ApiModule {}
