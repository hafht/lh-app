export interface HttpClientConfig {
  'x-app-id': number;
  'x-screen-id': number
}


export interface HttpRequestConfig {
  isCached?: boolean,
  isPublishAPI?: boolean
  isLoggingEnabled?: boolean
}


export interface ApiResponseMetadata {
  code: string;
  message?: string;
  requestId?: string;
}


export interface ApiResponsesModel<T> {
  metadata: ApiResponseMetadata;
  data: T | null;
}
