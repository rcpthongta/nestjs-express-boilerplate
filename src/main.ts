import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./apps/app.module.js";

class Main {
  private readonly logger: Logger = new Logger(Main.name);

  private async closeApplication(application?: NestExpressApplication): Promise<void> {
    try {
      await application?.close();
    } catch (error: unknown) {
      this.logger.fatal(error);
    }
  }

  public async bootstrap(): Promise<void> {
    let application: NestExpressApplication | undefined;

    try {
      application = await NestFactory.create<NestExpressApplication>(AppModule);

      await application.listen(3000);

      this.logger.log(`Listening on port ${await application.getUrl()}`);
      this.logger.log("Application started successfully");
    } catch (error: unknown) {
      process.exitCode = 1;

      this.logger.fatal(error);
      this.logger.fatal("Application failed to start");

      await this.closeApplication(application);
    }
  }
}

await new Main().bootstrap();
