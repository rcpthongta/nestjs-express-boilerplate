import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

import { WinstonModule } from "nest-winston";
import { ClsModule, ClsModuleFactoryOptions } from "nestjs-cls";

import { HttpLoggingMiddleware } from "./middlewares/http-logging.middleware";
import { ContextConfiguration } from "./modules/context/context.configuration";
import { ContextModule } from "./modules/context/context.module";
import { LoggingConfiguration } from "./modules/logging/logging.configuration";
import { LoggingModule } from "./modules/logging/logging.module";

@Module({
  imports: [
    ClsModule.forRootAsync({
      global: true,
      imports: [ContextModule],
      useFactory: (configuration: ContextConfiguration): ClsModuleFactoryOptions => configuration.cls(),
      inject: [ContextConfiguration]
    }),
    WinstonModule.forRootAsync({
      imports: [LoggingModule],
      useClass: LoggingConfiguration
    })
  ]
})
export class CoreModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggingMiddleware).forRoutes({ method: RequestMethod.ALL, path: "*" });
  }
}
