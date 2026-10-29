import { HttpException, Injectable, ValidationPipe as NestJSValidationPipe } from "@nestjs/common";

import { ValidationError } from "class-validator";

import { ValidationException } from "./validation.exception";
import type { ValidationErrorResponse } from "./validation.interface";
import type {
  CreateExceptionFactory,
  NestValidationExceptionFactory,
  ValidationConstraintEntry,
  ValidationMessageEntry,
  ValidationMessages
} from "./validation.type";

@Injectable()
export class ValidationPipe extends NestJSValidationPipe {
  public constructor() {
    super({
      transform: true,
      transformOptions: {
        enableImplicitConversion: false
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      validationError: {
        target: false,
        value: false
      },
      errorFormat: "grouped"
    });
  }

  public override createExceptionFactory(): CreateExceptionFactory {
    const createException: NestValidationExceptionFactory = super.createExceptionFactory();

    return (errors?: ValidationError[]): ValidationException => {
      const exception: HttpException = createException(errors) as HttpException;
      const response: ValidationErrorResponse = exception.getResponse() as ValidationErrorResponse;
      const entries: ValidationMessageEntry[] = Object.entries(response.message).map(
        ([property, constraints]: ValidationConstraintEntry): ValidationMessageEntry => [property, constraints[0]]
      );
      const messages: ValidationMessages = Object.fromEntries(entries);

      return new ValidationException(messages);
    };
  }
}
