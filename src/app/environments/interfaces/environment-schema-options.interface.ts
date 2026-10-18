import * as Joi from "joi";

export interface EnvironmentSchemaOptions {
  readonly NODE_ENV: Joi.StringSchema;
  readonly SERVER_PORT: Joi.NumberSchema;
  readonly LOGGING_LEVEL: Joi.StringSchema;
  readonly LOGGING_TIMESTAMP_FORMAT: Joi.StringSchema;
}
