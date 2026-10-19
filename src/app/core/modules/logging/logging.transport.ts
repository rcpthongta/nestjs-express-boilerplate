import { metadata } from "@metadata";

import { Injectable } from "@nestjs/common";
import { createFormatter, FormatFunction } from "@rcpthongta/string-utils";

import WinstonDailyRotateFile from "winston-daily-rotate-file";

import * as winston from "winston";

import { FileOptions } from "./interfaces/file-options.interface";

import { LoggingFormatter } from "./logging.formatter";

@Injectable()
export class LoggingTransport {
  private static readonly DEFAULT_AUDIT_HASH_TYPE: string = "sha256";
  private static readonly DATE_PATTERN: string = "YYYYMMDD";
  private static readonly FORMAT_FILENAME: FormatFunction = createFormatter("{0.name}-%DATE%-{1}.log");

  private readonly formatter: LoggingFormatter;

  public constructor(formatter: LoggingFormatter) {
    this.formatter = formatter;
  }

  public file(options: FileOptions): WinstonDailyRotateFile {
    const isJson: boolean = options.json ?? false;

    return new WinstonDailyRotateFile({
      level: options.level,
      format: winston.format.combine(
        this.formatter.skipMessageByLevels({
          list: options.skipLevels ?? []
        }),
        isJson ? winston.format.json() : this.formatter.printf()
      ),
      dirname: options.dirname,
      filename: LoggingTransport.FORMAT_FILENAME(metadata, options.level),
      datePattern: LoggingTransport.DATE_PATTERN,
      json: isJson,
      zippedArchive: true,
      auditHashType: options.auditHashType ?? LoggingTransport.DEFAULT_AUDIT_HASH_TYPE,
      maxFiles: options.maxFiles,
      maxSize: options.maxSize
    });
  }
}
