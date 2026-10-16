import { EnvironmentOptions } from "./interfaces/environment-options.interface";

export function environment(): EnvironmentOptions {
  return {
    profile: process.env.NODE_ENV ?? "development",
    server: {
      port: Number.parseInt(process.env.SERVER_PORT ?? "3000", 10)
    }
  };
}
