import { catchError, EMPTY, Observable, pipe } from 'rxjs';
import { RestfulApiConfig } from './../config/restful-api-config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestfulapiService {

  constructor(private httpClient: HttpClient) { }

  public get = <T>(config: RestfulApiConfig): Observable<T> => {
    return this.httpClient.get<T>(config.url, config.options)
    .pipe(catchError((error) => {
      return EMPTY;
    }))
  }

  public post = <T>(config: RestfulApiConfig): Observable<T> => {
    return this.httpClient.post<T>(config.url, config.body, config.options)
    .pipe(
      catchError((error) => {
        return EMPTY;
      })
    )
  }
}
