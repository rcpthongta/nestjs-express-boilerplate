import type { EnvironmentLoggingOptions } from "./environment-logging-options.interface";
import type { EnvironmentSecurityOptions } from "./environment-security-options.interface";
import type { EnvironmentServerOptions } from "./environment-server-options.interface";

export interface EnvironmentOptions {
  readonly profile: string;
  readonly server: EnvironmentServerOptions;
  readonly security: EnvironmentSecurityOptions;
  readonly logging: EnvironmentLoggingOptions;
}
