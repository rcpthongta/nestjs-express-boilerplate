export interface EnvironmentSecurityRequestLimitOptions {
  readonly limit: string;
}

export interface EnvironmentSecurityRequestOptions {
  readonly json: EnvironmentSecurityRequestLimitOptions;
  readonly urlencoded: EnvironmentSecurityRequestLimitOptions;
}

export interface EnvironmentSecurityThrottlerOptions {
  readonly ttl: number;
  readonly limit: number;
}

export interface EnvironmentSecurityOptions {
  readonly request: EnvironmentSecurityRequestOptions;
  readonly throttler: EnvironmentSecurityThrottlerOptions;
}
