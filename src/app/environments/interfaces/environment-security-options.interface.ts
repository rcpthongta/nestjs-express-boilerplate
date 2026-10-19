export interface EnvironmentSecurityOptions {
  readonly request: EnvironmentSecurityRequestOptions;
}

export interface EnvironmentSecurityRequestOptions {
  readonly json: EnvironmentSecurityRequestLimitOptions;
  readonly urlencoded: EnvironmentSecurityRequestLimitOptions;
}

export interface EnvironmentSecurityRequestLimitOptions {
  readonly limit: string;
}
