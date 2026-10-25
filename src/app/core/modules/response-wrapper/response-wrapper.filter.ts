import { GlobalResponseException } from "@common";
import { GlobalErrorResponse, GlobalStatusResponse } from "@dto";

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { defaultIfBlank } from "@rcpthongta/string-utils";

import { Response } from "express";

@Catch(GlobalResponseException)
export class ResponseWrapperFilter implements ExceptionFilter<GlobalResponseException> {
  private buildResponse(exception: GlobalResponseException): GlobalErrorResponse {
    const statusCode: number = exception.getStatus();

    return new GlobalErrorResponse({
      status: new GlobalStatusResponse({
        code: statusCode,
        message: defaultIfBlank(HttpStatus[statusCode], "")
      }),
      error: exception.getResponse()
    });
  }

  public catch(exception: GlobalResponseException, host: ArgumentsHost): void {
    host.switchToHttp().getResponse<Response>().status(exception.getStatus()).json(this.buildResponse(exception));
  }
}
