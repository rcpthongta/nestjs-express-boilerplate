import { defaultIfBlank, hasText } from "@rcpthongta/string-utils";

import process from "node:process";

import { EnvironmentOptions } from "./interfaces/environment-options.interface";

export function environment(): EnvironmentOptions {
  const levels: Set<string> = new Set(["fatal", "error", "warn", "http", "info", "verbose", "debug"]);

  return {
    profile: process.env.NODE_ENV!,
    server: {
      port: Number.parseInt(process.env.SERVER_PORT!, 10)
    },
    security: {
      throttler: {
        ttl: Number(defaultIfBlank(process.env.SECURITY_THROTTLER_TTL, "60000")),
        limit: Number(defaultIfBlank(process.env.SECURITY_THROTTLER_LIMIT, "100"))
      },
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
      level:
        hasText(process.env.LOGGING_LEVEL) && levels.has(process.env.LOGGING_LEVEL)
          ? process.env.LOGGING_LEVEL
          : "info",
      timestamp: {
        format: defaultIfBlank(process.env.LOGGING_TIMESTAMP_FORMAT, "MM/DD/YYYY HH:mm:ss A")
      }
    }
  };
}
