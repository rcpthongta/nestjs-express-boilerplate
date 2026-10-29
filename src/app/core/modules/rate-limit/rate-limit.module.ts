import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";

import { RateLimitConfiguration } from "./rate-limit.configuration";
import { RateLimitGuard } from "./rate-limit.guard";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useClass: RateLimitConfiguration
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard
    }
  ]
})
export class RateLimitModule {}
