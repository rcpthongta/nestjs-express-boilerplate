import { Inject, Injectable, NestMiddleware } from "@nestjs/common";

import morgan from "morgan";

import { NextFunction, Request, Response } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class HttpLoggingMiddleware implements NestMiddleware {
  private static readonly CONTEXT: string = "API";
  private static readonly FORMAT: string =
    ":method {:url} HTTP/:http-version (:referrer) > :status (:status-message) :res[x-response-time] • :remote-addr (:remote-user) :user-agent";
  private static readonly LEVEL: string = "http";
  private static readonly STATUS_MESSAGE_TOKEN: string = "status-message";

  private readonly handler: ReturnType<typeof morgan>;
  private readonly logger: Logger;

  public constructor(@Inject(WINSTON_MODULE_PROVIDER) logger: Logger) {
    this.logger = logger;

    this.registerTokens();

    this.handler = morgan(HttpLoggingMiddleware.FORMAT, {
      stream: {
        write: this.write.bind(this)
      }
    });
  }

  private getStatusMessage(_request: Request, response: Response): string | undefined {
    return response.statusMessage;
  }

  private registerTokens(): void {
    morgan.token(HttpLoggingMiddleware.STATUS_MESSAGE_TOKEN, this.getStatusMessage.bind(this));
  }

  private write(message: string): void {
    this.logger.log(HttpLoggingMiddleware.LEVEL, message.trim(), {
      context: HttpLoggingMiddleware.CONTEXT
    });
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.handler(request, response, next);
  }
}
