import { EnvironmentLoggingOptions } from "./environment-logging-options.interface";
import { EnvironmentServerOptions } from "./environment-server-options.interface";

export interface EnvironmentOptions {
  readonly profile: string;
  readonly server: EnvironmentServerOptions;
  readonly logging: EnvironmentLoggingOptions;
}
