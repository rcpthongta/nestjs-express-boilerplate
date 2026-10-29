import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { WinstonModule } from "nest-winston";
import { ClsModule, ClsModuleFactoryOptions } from "nestjs-cls";

import { CompressionMiddleware } from "./middlewares/compression.middleware";
import { HelmetMiddleware } from "./middlewares/helmet.middleware";
import { HttpLoggingMiddleware } from "./middlewares/http-logging.middleware";
import { ResponseTimeMiddleware } from "./middlewares/response-time.middleware";
import { ContextConfiguration } from "./modules/context/context.configuration";
import { ContextModule } from "./modules/context/context.module";
import { LoggingConfiguration } from "./modules/logging/logging.configuration";
import { LoggingModule } from "./modules/logging/logging.module";
import { RateLimitModule } from "./modules/rate-limit/rate-limit.module";
import { ResponseWrapperModule } from "./modules/response-wrapper/response-wrapper.module";

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
    }),
    RateLimitModule,
    ResponseWrapperModule
  ]
})
export class CoreModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(HelmetMiddleware, CompressionMiddleware, ResponseTimeMiddleware, HttpLoggingMiddleware)
      .forRoutes("*path");
  }
}
