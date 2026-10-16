import { TestBed } from "@suites/unit";

import { beforeAll, describe, test, TestContext } from "vitest";

import { ExampleService } from "./example.service";

describe("ExampleService (Unit)", (): void => {
  let service: ExampleService;

  beforeAll(async (): Promise<void> => {
    const { unit } = await TestBed.solitary(ExampleService).compile();

    service = unit;
  });

  test("should be defined", ({ expect }: TestContext): void => {
    expect(service).toBeDefined();
  });

  describe("Success cases", (): void => {
    test('should return "NestJS Express Boilerplate"', ({ expect }: TestContext): void => {
      expect(service.hello()).toBe("NestJS Express Boilerplate");
    });
  });
});
