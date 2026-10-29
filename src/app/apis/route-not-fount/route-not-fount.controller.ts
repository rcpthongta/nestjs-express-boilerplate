import { All, Controller } from "@nestjs/common";

import { RouteNotFoundException } from "./route-not-found.exception";

@Controller()
export class RouteNotFoundController {
  @All()
  public handle(): never {
    throw new RouteNotFoundException();
  }
}
