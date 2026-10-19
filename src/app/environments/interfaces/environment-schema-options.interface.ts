import * as Joi from "joi";

export interface EnvironmentSchemaOptions {
  readonly NODE_ENV: Joi.StringSchema;
  readonly SERVER_PORT: Joi.NumberSchema;
  readonly SECURITY_REQUEST_JSON_LIMIT: Joi.StringSchema;
  readonly SECURITY_REQUEST_URLENCODED_LIMIT: Joi.StringSchema;
  readonly LOGGING_LEVEL: Joi.StringSchema;
  readonly LOGGING_TIMESTAMP_FORMAT: Joi.StringSchema;
}
