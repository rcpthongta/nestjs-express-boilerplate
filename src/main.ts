import { EnvironmentService } from "@environment";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { ExpressAdapter } from "@nestjs/platform-express";

import process from "node:process";

import { useContainer } from "class-validator";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

import { AppModule } from "./app/app.module";

class Bootstrap {
  private static readonly logger: Logger = new Logger(Bootstrap.name);

  private static async closeApplication(application: NestExpressApplication | undefined): Promise<void> {
    try {
      await application?.close();
    } catch (error: unknown) {
      this.logger.fatal(error, null);
    }
  }

  public static async start(): Promise<void> {
    let application: NestExpressApplication | undefined;

    try {
      const adapter: ExpressAdapter = new ExpressAdapter();

      application = await NestFactory.create(AppModule, adapter, {
        abortOnError: false,
        bufferLogs: true,
        bodyParser: false
      });

      const environment: EnvironmentService = application.get(EnvironmentService);

      useContainer(application.select(AppModule), { fallbackOnErrors: true });

      application.useLogger(application.get(WINSTON_MODULE_NEST_PROVIDER));
      application.useBodyParser("json", {
        limit: environment.security.request.json.limit
      });
      application.useBodyParser("urlencoded", {
        limit: environment.security.request.urlencoded.limit,
        extended: true
      });

      await application.listen(environment.server.port);

      const url: string = await application.getUrl();

      this.logger.log(`Running in ${environment.profile} mode`);
      this.logger.log(`Listening on port ${url}`);
      this.logger.log("Application started successfully");
    } catch (error: unknown) {
      process.exitCode = 1;

      Logger.flush();

      this.logger.fatal(error, null);
      this.logger.fatal("Application failed to start", null);

      await this.closeApplication(application);
    }
  }
}

void Bootstrap.start();
