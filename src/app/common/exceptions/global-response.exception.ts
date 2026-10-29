import { HttpException } from "@nestjs/common";

export class GlobalResponseException extends HttpException {
  public constructor(response: string | Record<string, unknown>, statusCode: number) {
    super(response, statusCode);

    this.name = new.target.name;
  }
}
