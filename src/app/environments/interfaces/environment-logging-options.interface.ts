export interface EnvironmentLoggingOptions {
  readonly level: string;
  readonly timestamp: EnvironmentLoggingTimestampOptions;
}

export interface EnvironmentLoggingTimestampOptions {
  readonly format: string;
}
