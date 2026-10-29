export class GlobalStatusResponse {
  public code: number;
  public message: string;

  public constructor(initial: Required<GlobalStatusResponse>) {
    this.code = initial.code;
    this.message = initial.message;
  }
}

export class GlobalResponse<T> {
  public status: GlobalStatusResponse;
  public result: T;

  public constructor(initial: Required<GlobalResponse<T>>) {
    this.status = initial.status;
    this.result = initial.result;
  }
}

export class GlobalErrorResponse {
  public status: GlobalStatusResponse;
  public error: string | object;

  public constructor(initial: Required<GlobalErrorResponse>) {
    this.status = initial.status;
    this.error = initial.error;
  }
}
