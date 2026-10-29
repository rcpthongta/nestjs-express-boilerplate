import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

import { RateLimitException } from "./rate-limit.exception";

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected override async throwThrottlingException(): Promise<void> {
    throw new RateLimitException();
  }
}
