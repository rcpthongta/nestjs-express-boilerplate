import { EnvironmentService } from "@environment";

import { Injectable } from "@nestjs/common";
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from "@nestjs/throttler";

@Injectable()
export class RateLimitConfiguration implements ThrottlerOptionsFactory {
  private readonly ttl: number;
  private readonly limit: number;

  public constructor(environment: EnvironmentService) {
    this.ttl = environment.security.throttler.ttl;
    this.limit = environment.security.throttler.limit;
  }

  public createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      throttlers: [
        {
          ttl: this.ttl,
          limit: this.limit
        }
      ]
    };
  }
}
