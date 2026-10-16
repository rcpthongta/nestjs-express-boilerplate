import * as Joi from "joi";

export interface EnvironmentSchemaOptions {
  readonly NODE_ENV: Joi.StringSchema;
  readonly SERVER_PORT: Joi.NumberSchema;
}
