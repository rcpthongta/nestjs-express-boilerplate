import process from "node:process";

import { EnvironmentOptions } from "./interfaces/environment-options.interface";

export function environment(): EnvironmentOptions {
  return {
    profile: process.env.NODE_ENV!,
    server: {
      port: Number.parseInt(process.env.SERVER_PORT!, 10)
    },
    logging: {
      level: process.env.LOGGING_LEVEL ?? "debug",
      timestamp: {
        format: process.env.LOGGING_TIMESTAMP_FORMAT ?? "MM/DD/YYYY HH:mm:ss A"
      }
    }
  };
}
