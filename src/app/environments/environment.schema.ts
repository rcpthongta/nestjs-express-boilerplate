import * as Joi from "joi";

import { EnvironmentSchemaOptions } from "./interfaces/environment-schema-options.interface";

export const environmentSchema: Joi.ObjectSchema<EnvironmentSchemaOptions> = Joi.object<EnvironmentSchemaOptions>({
  NODE_ENV: Joi.string().valid("development", "staging", "production").required(),
  SERVER_PORT: Joi.number().port().required()
}).required();
