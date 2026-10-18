import { EnvironmentLoggingTimestampOptions, EnvironmentService } from "@environment";
import { metadata } from "@metadata";

import { Injectable } from "@nestjs/common";
import { format } from "@rcpthongta/string-utils";

import * as winston from "winston";

import { WinstonModuleOptions, WinstonModuleOptionsFactory } from "nest-winston";

import { LoggingFormatter } from "./logging.formatter";
import { LoggingTransport } from "./logging.transport";

@Injectable()
export class LoggingConfiguration implements WinstonModuleOptionsFactory {
  private static readonly COLORS: Record<string, string> = {
    fatal: "black",
    error: "red",
    warn: "yellow",
    http: "magenta",
    info: "green",
    verbose: "cyan",
    debug: "blue"
  };
  private static readonly LABEL: string = format("{0.name} (v{0.version})", metadata);
  private static readonly LEVELS: winston.config.AbstractConfigSetLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    http: 3,
    info: 4,
    verbose: 5,
    debug: 6
  };
  private static readonly SKIP_CONTEXTS: string[] = ["NestApplication", "NestFactory"];

  private readonly formatter: LoggingFormatter;
  private readonly level: string;
  private readonly timestamp: EnvironmentLoggingTimestampOptions;
  private readonly transport: LoggingTransport;

  public constructor(environment: EnvironmentService, formatter: LoggingFormatter, transport: LoggingTransport) {
    this.formatter = formatter;
    this.level = environment.logging.level;
    this.timestamp = environment.logging.timestamp;
    this.transport = transport;
  }

  private format(): winston.Logform.Format {
    return winston.format.combine(
      this.formatter.skipMessageByContexts({
        list: LoggingConfiguration.SKIP_CONTEXTS
      }),
      this.formatter.system(),
      this.formatter.requestId(),
      winston.format.timestamp({ format: this.timestamp.format }),
      winston.format.ms(),
      winston.format.label({
        label: LoggingConfiguration.LABEL,
        message: false
      }),
      winston.format.errors({ stack: true }),
      this.formatter.levelUpperCase()
    );
  }

  private transports(): winston.transport[] {
    return [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({
            all: true,
            colors: LoggingConfiguration.COLORS
          }),
          this.formatter.printf()
        )
      }),
      this.transport.file({
        level: "http",
        skipLevels: ["fatal", "error", "warn"],
        dirname: "logs",
        maxFiles: "7d",
        maxSize: "10m"
      }),
      this.transport.file({
        level: this.level,
        skipLevels: ["http"],
        dirname: "logs",
        maxFiles: "7d",
        maxSize: "10m"
      })
    ];
  }

  public createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      level: this.level,
      levels: LoggingConfiguration.LEVELS,
      format: this.format(),
      transports: this.transports()
    };
  }
}
