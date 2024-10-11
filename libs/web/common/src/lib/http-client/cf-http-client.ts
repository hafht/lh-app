import {HttpClient, HttpContext, HttpHeaders} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {HTTP_CLIENT_CONFIG_TOKEN} from "./config.token";

@Injectable({
  providedIn: 'root'
})

export class CFHttpClient {
  private _httpClient = inject(HttpClient)
  private _config = inject(HTTP_CLIENT_CONFIG_TOKEN)

  get(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    context?: HttpContext;
  }) {
    return this._httpClient.get(url, options)
  }
}

