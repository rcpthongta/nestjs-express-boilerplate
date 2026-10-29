import { GlobalResponseException } from "@common";

import { HttpStatus } from "@nestjs/common";

import type { ValidationMessages } from "./validation.type";

export class ValidationException extends GlobalResponseException {
  public constructor(messages: ValidationMessages) {
    super(messages, HttpStatus.BAD_REQUEST);
  }
}
