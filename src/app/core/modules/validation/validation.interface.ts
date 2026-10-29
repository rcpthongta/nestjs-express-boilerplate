import type { ValidationConstraints } from "./validation.type";

export interface ValidationErrorResponse {
  readonly message: ValidationConstraints;
}
