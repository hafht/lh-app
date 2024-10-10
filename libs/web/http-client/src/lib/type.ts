export interface HttpClientConfig {
  'x-app-id': number;
  'x-screen-id': number
}


export interface HttpRequestConfig {
  isCached?: boolean,
  isPublishAPI?: boolean
  isLoggingEnabled?: boolean
}
