import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { ExampleModule } from "./examples/example.module";

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
