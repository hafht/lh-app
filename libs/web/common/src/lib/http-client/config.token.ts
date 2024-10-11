import { InjectionToken } from "@angular/core"
import {HttpClientConfig, HttpRequestConfig} from "./type"
import {HttpContextToken} from "@angular/common/http";

export const HTTP_CLIENT_CONFIG_TOKEN = new InjectionToken<HttpClientConfig>('CF app config for http client'

)

export const defaultHttpRequestConfigContext: HttpRequestConfig = {
  isCached: false,
  isPublishAPI: false,
}
export const HTTP_REQUEST_CONFIG_CONTEXT = new HttpContextToken<HttpRequestConfig>(() => defaultHttpRequestConfigContext )
