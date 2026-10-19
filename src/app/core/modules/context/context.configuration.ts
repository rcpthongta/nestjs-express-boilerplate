import { Injectable } from "@nestjs/common";
import { hasText } from "@rcpthongta/string-utils";

import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { ClsModuleFactoryOptions, ClsService } from "nestjs-cls";

@Injectable()
export class ContextConfiguration {
  private static readonly X_REQUEST_ID: string = "x-request-id";

  private generateRequestId(request: Request): string {
    const header: string | string[] | undefined = request.headers[ContextConfiguration.X_REQUEST_ID];
    const requestId: string | undefined = Array.isArray(header) ? header[0] : header;

    return hasText(requestId) ? requestId.trim() : nanoid();
  }

  private setResponseHeader(cls: ClsService, response: Response): void {
    response.setHeader(ContextConfiguration.X_REQUEST_ID, cls.getId());
  }

  private setup(cls: ClsService, _request: Request, response: Response) {
    this.setResponseHeader(cls, response);
  }

  public cls(): ClsModuleFactoryOptions {
    return {
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: this.generateRequestId.bind(this),
        setup: this.setup.bind(this)
      }
    };
  }
}
