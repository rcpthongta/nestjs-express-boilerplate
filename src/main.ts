import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import { EnvironmentService } from "@environment";

import { AppModule } from "./app/app.module";

class Bootstrap {
  private static readonly logger: Logger = new Logger(Bootstrap.name);

  public static async start(): Promise<void> {
    try {
      const adapter: ExpressAdapter = new ExpressAdapter();
      const application: NestExpressApplication = await NestFactory.create(AppModule, adapter);
      const environment: EnvironmentService = application.get(EnvironmentService);

      await application.listen(environment.server.port);

      const url: string = await application.getUrl();

      this.logger.log(`Running in ${environment.profile} mode`);
      this.logger.log(`Listening on port ${url}`);
      this.logger.log("Application started successfully");
    } catch (error: unknown) {
      this.logger.error(error);
      this.logger.error("Application failed to start");
    }
  }
}

void Bootstrap.start();
