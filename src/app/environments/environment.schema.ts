import * as Joi from "joi";

import { EnvironmentSchemaOptions } from "./interfaces/environment-schema-options.interface";

export const environmentSchema: Joi.ObjectSchema<EnvironmentSchemaOptions> = Joi.object<EnvironmentSchemaOptions>({
  NODE_ENV: Joi.string().valid("development", "staging", "production").required(),
  SERVER_PORT: Joi.number().port().required(),
  LOGGING_LEVEL: Joi.string().valid("fatal", "error", "warn", "http", "info", "verbose", "debug").allow(""),
  LOGGING_TIMESTAMP_FORMAT: Joi.string().allow("")
}).required();
