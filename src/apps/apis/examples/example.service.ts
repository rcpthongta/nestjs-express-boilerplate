import { Injectable } from "@nestjs/common";

@Injectable()
export class ExampleService {
  public hello(): string {
    return "NestJS Express Boilerplate";
  }
}
