import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";


export interface RestfulApiConfig {
  url: string;
  body?: any;
  options?: HttpOptions;
}

export interface HttpOptions {
  header?: HttpHeaders;
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;

}
