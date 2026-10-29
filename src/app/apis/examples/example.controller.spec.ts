import { TestBed, type Mocked } from "@suites/unit";

import { beforeAll, describe, test, type TestContext } from "vitest";

import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";

describe("ExampleController (Unit)", (): void => {
  let controller: ExampleController;
  let service: Mocked<ExampleService>;

  beforeAll(async (): Promise<void> => {
    const { unit, unitRef } = await TestBed.solitary(ExampleController).compile();

    controller = unit;
    service = unitRef.get(ExampleService);
  });

  test("should be defined", ({ expect }: TestContext): void => {
    expect(controller).toBeDefined();
  });

  describe("Success cases", (): void => {
    test('should return "NestJS Express Boilerplate"', ({ expect }: TestContext): void => {
      const expected: string = "NestJS Express Boilerplate";

      service.hello.mockReturnValue(expected);

      expect(controller.index()).toBe(expected);
    });
  });
});
