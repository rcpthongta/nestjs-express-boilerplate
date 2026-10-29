import { GlobalResponseException } from "@common";

import { HttpStatus } from "@nestjs/common";

export class RateLimitException extends GlobalResponseException {
  public constructor() {
    super("Too Many Requests", HttpStatus.TOO_MANY_REQUESTS);
  }
}
