import type { GlobalResponseException } from "@common";

import type { ValidationError } from "class-validator";

export type CreateExceptionFactory = (errors?: ValidationError[]) => GlobalResponseException;
export type NestValidationExceptionFactory = (errors?: ValidationError[]) => unknown;
export type ValidationConstraints = Record<string, string[]>;
export type ValidationConstraintEntry = [property: string, constraints: string[]];
export type ValidationMessageEntry = [property: string, message: string | undefined];
export type ValidationMessages = Record<string, string | undefined>;
