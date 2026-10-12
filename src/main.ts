import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app/app.module";

class Bootstrap {
  private static readonly logger: Logger = new Logger(Bootstrap.name);

  public static async start(): Promise<void> {
    try {
      const adapter: ExpressAdapter = new ExpressAdapter();
      const application: NestExpressApplication = await NestFactory.create(AppModule, adapter);

      await application.listen(3000);

      const url: string = await application.getUrl();

      this.logger.log(`Listening on port ${url}`);
      this.logger.log("Application started successfully");
    } catch (error: unknown) {
      this.logger.error(error);
      this.logger.error("Application failed to start");
    }
  }
}

void Bootstrap.start();
