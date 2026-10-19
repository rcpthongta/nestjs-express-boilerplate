import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvironmentLoggingOptions } from "./interfaces/environment-logging-options.interface";
import { EnvironmentServerOptions } from "./interfaces/environment-server-options.interface";

@Injectable()
export class EnvironmentService {
  private readonly config: ConfigService;

  public constructor(config: ConfigService) {
    this.config = config;
  }

  public get profile(): string {
    return this.config.getOrThrow("profile");
  }

  public get server(): EnvironmentServerOptions {
    return this.config.getOrThrow("server");
  }

  public get logging(): EnvironmentLoggingOptions {
    return this.config.getOrThrow("logging");
  }
}
