import { defaultIfBlank, hasText } from "@rcpthongta/string-utils";

import process from "node:process";

import { EnvironmentOptions } from "./interfaces/environment-options.interface";

export function environment(): EnvironmentOptions {
  const loggingLevels: Set<string> = new Set(["fatal", "error", "warn", "http", "info", "verbose", "debug"]);
  const rawLevel: string | undefined = process.env.LOGGING_LEVEL;
  const level: string = hasText(rawLevel) && loggingLevels.has(rawLevel) ? rawLevel : "info";

  return {
    profile: process.env.NODE_ENV ?? "development",
    server: {
      port: Number.parseInt(process.env.SERVER_PORT ?? "3000", 10)
    },
    security: {
      request: {
        json: {
          limit: defaultIfBlank(process.env.SECURITY_REQUEST_JSON_LIMIT, "100kb")
        },
        urlencoded: {
          limit: defaultIfBlank(process.env.SECURITY_REQUEST_URLENCODED_LIMIT, "100kb")
        }
      }
    },
    logging: {
      level: level,
      timestamp: {
        format: defaultIfBlank(process.env.LOGGING_TIMESTAMP_FORMAT, "MM/DD/YYYY HH:mm:ss A")
      }
    }
  };
}
