import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const SKIP_RESPONSE_WRAPPER_KEY: string = "SKIP_RESPONSE_WRAPPER";

export function SkipResponseWrapper(): CustomDecorator<string> {
  return SetMetadata(SKIP_RESPONSE_WRAPPER_KEY, true);
}
