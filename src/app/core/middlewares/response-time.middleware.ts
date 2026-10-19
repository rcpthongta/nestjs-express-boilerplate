import { Injectable, NestMiddleware } from "@nestjs/common";

import responseTime from "response-time";

import { NextFunction, Request, Response } from "express";

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  private readonly handler: ReturnType<typeof responseTime>;

  public constructor() {
    this.handler = responseTime();
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.handler(request, response, next);
  }
}
