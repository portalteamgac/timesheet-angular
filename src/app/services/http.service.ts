import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Task, TimeSheet } from '../contracts';

const baseUrl = 'https://63d74fd85c4274b136f1fda5.mockapi.io/api/v1';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public fetchTasks(name?: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}/task?name=${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public saveTimeSheet(timeSheet: TimeSheet): Observable<TimeSheet> {
    return this.http.post<TimeSheet>(`${baseUrl}/log`, timeSheet)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('API error:', error);
    return throwError(error);
  }

  public getTimeLogs(): Observable<TimeSheet[]> {
    return this.http.get<TimeSheet[]>(`${baseUrl}/log`)
      .pipe(
        catchError(this.handleError)
      );
  }

}
