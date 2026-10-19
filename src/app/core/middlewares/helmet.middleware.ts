import { Injectable, NestMiddleware } from "@nestjs/common";

import helmet from "helmet";

import { NextFunction, Request, Response } from "express";

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  private readonly handler: ReturnType<typeof helmet>;

  public constructor() {
    this.handler = helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: {
        policy: "cross-origin"
      }
    });
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.handler(request, response, next);
  }
}
