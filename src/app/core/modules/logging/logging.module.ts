import { Module } from "@nestjs/common";

import { LoggingFormatter } from "./logging.formatter";
import { LoggingTransport } from "./logging.transport";

@Module({
  providers: [LoggingFormatter, LoggingTransport],
  exports: [LoggingFormatter, LoggingTransport]
})
export class LoggingModule {}
