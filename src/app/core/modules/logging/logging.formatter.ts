import { Injectable } from "@nestjs/common";
import { createFormatter, FormatFunction, hasText } from "@rcpthongta/string-utils";

import os from "node:os";
import process from "node:process";

import * as winston from "winston";

import { nanoid } from "nanoid";
import { ClsService } from "nestjs-cls";

import { SkipMessageOptions } from "./interfaces/skip-message-options.interface";

@Injectable()
export class LoggingFormatter {
  private static readonly FORMAT_MESSAGE: FormatFunction = createFormatter(
    "{0.label} [{0.pid} • {0.hostname} ({0.platform}) • Node.js {0.node}] {0.rid} - {0.timestamp}   {0.level} [{0.context}] {0.message} {0.ms}{1}"
  );
  private static readonly HOSTNAME: string = os.hostname();
  private static readonly LEVEL_SYMBOL: symbol = Symbol.for("level");
  private static readonly NODE: string = process.version;
  private static readonly PID: number = process.pid;
  private static readonly PLATFORM: NodeJS.Platform = os.platform();
  private static readonly RID: string = nanoid();

  private readonly cls: ClsService;

  public constructor(cls: ClsService) {
    this.cls = cls;
  }

  public levelUpperCase(): winston.Logform.Format {
    return winston.format((transformable: winston.Logform.TransformableInfo): winston.Logform.TransformableInfo => {
      const level: string = transformable.level.toUpperCase();

      transformable.level = level.length < 7 ? level.padStart(7, " ") : level;

      return transformable;
    })();
  }

  private formatStack(stack: unknown): string {
    if (hasText(stack)) {
      return `\n${stack}`;
    }

    if (Array.isArray(stack) && stack.length > 0) {
      const traces: string = stack.filter((message: unknown): message is string => hasText(message)).join("\n");

      return hasText(traces) ? `\n${traces}` : "";
    }

    return "";
  }

  private generateErrorCause(cause: unknown): string {
    if (!cause) {
      return "";
    }

    if (cause instanceof Error) {
      const detail: string = cause.stack ?? `${cause.name}: ${cause.message}`;

      return `\n[Caused by] ${detail}${this.generateErrorCause(cause.cause)}`;
    }

    if (typeof cause === "string" || typeof cause === "boolean" || typeof cause === "number") {
      return `\n[Caused by] ${String(cause)}`;
    }

    if (typeof cause === "object") {
      return `\n[Caused by] ${JSON.stringify(cause)}`;
    }

    return "";
  }

  public printf(): winston.Logform.Format {
    return winston.format.printf((transformable: winston.Logform.TransformableInfo): string => {
      const error: Error | undefined = transformable.error instanceof Error ? transformable.error : undefined;

      let stack: string = error
        ? this.formatStack(error.stack ?? error.message)
        : this.formatStack(transformable.stack);

      if (stack !== "") {
        stack += this.generateErrorCause(error ? error.cause : transformable.cause);
      }

      return LoggingFormatter.FORMAT_MESSAGE(transformable, stack);
    });
  }

  public requestId(): winston.Logform.Format {
    return winston.format((transformable: winston.Logform.TransformableInfo): winston.Logform.TransformableInfo => {
      const rid: string | undefined = this.cls.isActive() ? this.cls.getId() : undefined;

      transformable.rid = hasText(rid) ? rid : LoggingFormatter.RID;

      return transformable;
    })();
  }

  public skipMessageByContexts(opts: SkipMessageOptions): winston.Logform.Format {
    const contexts: Set<string> = new Set<string>(opts.list);

    return winston.format(
      (transformable: winston.Logform.TransformableInfo): winston.Logform.TransformableInfo | boolean => {
        return hasText(transformable.context) && contexts.has(transformable.context) ? false : transformable;
      }
    )();
  }

  public skipMessageByLevels(opts: SkipMessageOptions): winston.Logform.Format {
    const levels: Set<string> = new Set<string>(opts.list.map((level: string): string => level.toLowerCase().trim()));

    return winston.format(
      (transformable: winston.Logform.TransformableInfo): winston.Logform.TransformableInfo | boolean => {
        const rawLevel: unknown = transformable[LoggingFormatter.LEVEL_SYMBOL] ?? transformable.level;
        const normalizedLevel: string = hasText(rawLevel) ? rawLevel.toLowerCase().trim() : "";

        return levels.has(normalizedLevel) ? false : transformable;
      }
    )();
  }

  public system(): winston.Logform.Format {
    return winston.format((transformable: winston.Logform.TransformableInfo): winston.Logform.TransformableInfo => {
      transformable.hostname = LoggingFormatter.HOSTNAME;
      transformable.pid = LoggingFormatter.PID;
      transformable.platform = LoggingFormatter.PLATFORM;
      transformable.node = LoggingFormatter.NODE;

      return transformable;
    })();
  }
}
