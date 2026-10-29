import { GlobalResponseException } from "@common";

import { HttpStatus } from "@nestjs/common";

export class RouteNotFoundException extends GlobalResponseException {
  private static readonly MESSAGE: string =
    "The requested resource could not be found. Please verify the request URL and HTTP method, and ensure that the requested endpoint is available.";

  public constructor() {
    super(RouteNotFoundException.MESSAGE, HttpStatus.NOT_FOUND);

    this.name = new.target.name;
  }
}
