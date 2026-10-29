import { ExampleModule } from "@api";

import { ExpressAdapter, type NestExpressApplication } from "@nestjs/platform-express";
import { Test, type TestingModule } from "@nestjs/testing";

import supertest from "supertest";

import { afterEach, beforeEach, describe, test, type TestContext } from "vitest";

describe("Example (E2E)", (): void => {
  let application: NestExpressApplication;

  beforeEach(async (): Promise<void> => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [ExampleModule]
    }).compile();
    const adapter: ExpressAdapter = new ExpressAdapter();

    application = fixture.createNestApplication(adapter);

    await application.init();
  });

  afterEach(async (): Promise<void> => {
    await application.close();
  });

  describe("Success cases", (): void => {
    test('GET {/} > Ok (200) ~ should return "NestJS Express Boilerplate"', ({
      expect
    }: TestContext): supertest.Test => {
      return supertest(application.getHttpServer())
        .get("/")
        .expect((response: supertest.Response): void => {
          expect(response.status).toBe(200);
          expect(response.text).toBe("NestJS Express Boilerplate");
        });
    });
  });
});
