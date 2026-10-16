import * as Joi from "joi";

import { InvalidEnvironmentException } from "./exceptions/invalid-environment.exception";
import { EnvironmentSchemaOptions } from "./interfaces/environment-schema-options.interface";

import { environmentSchema } from "./environment.schema";

export function validateEnvironment(env: Record<string, unknown>): EnvironmentSchemaOptions {
  const { error, value }: Joi.ValidationResult<EnvironmentSchemaOptions> = environmentSchema.validate(env, {
    allowUnknown: true
  });

  if (error) {
    throw new InvalidEnvironmentException(error.message);
  }

  return value;
}
