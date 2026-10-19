import { Injectable, NestMiddleware } from "@nestjs/common";
import { hasText } from "@rcpthongta/string-utils";

import compression from "compression";

import { NextFunction, Request, Response } from "express";

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  private static readonly THRESHOLD: string = "1kb";
  private static readonly X_NO_COMPRESSION: string = "x-no-compression";

  private readonly handler: ReturnType<typeof compression>;

  public constructor() {
    this.handler = compression({
      threshold: CompressionMiddleware.THRESHOLD,
      filter: this.filter.bind(this)
    });
  }

  private filter(request: Request, response: Response): boolean {
    if (hasText(request.header(CompressionMiddleware.X_NO_COMPRESSION))) {
      return false;
    }

    return compression.filter(request, response);
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.handler(request, response, next);
  }
}
