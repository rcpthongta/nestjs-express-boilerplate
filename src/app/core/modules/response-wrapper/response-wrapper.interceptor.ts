import { SKIP_RESPONSE_WRAPPER_KEY } from "@common";
import { GlobalResponse, GlobalStatusResponse } from "@dto";

import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { defaultIfBlank } from "@rcpthongta/string-utils";

import { Response } from "express";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseWrapperInterceptor<T> implements NestInterceptor<T, T | GlobalResponse<T>> {
  private readonly reflector: Reflector;

  public constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  private buildResponse(statusCode: number, result: T): GlobalResponse<T> {
    return new GlobalResponse({
      status: new GlobalStatusResponse({
        code: statusCode,
        message: defaultIfBlank(HttpStatus[statusCode], "")
      }),
      result: result
    });
  }

  public intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T | GlobalResponse<T>> {
    const skip: boolean = this.reflector.get(SKIP_RESPONSE_WRAPPER_KEY, context.getHandler());

    if (skip) {
      return next.handle();
    }

    return next.handle().pipe(
      map((result: T): GlobalResponse<T> => {
        return this.buildResponse(context.switchToHttp().getResponse<Response>().statusCode, result);
      })
    );
  }
}
