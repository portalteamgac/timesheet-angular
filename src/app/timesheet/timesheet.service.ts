import { TimesheetModule } from './timesheet.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, Observable, switchMap } from 'rxjs';
import { RestfulApiConfig } from '../shared/config/restful-api-config';
import { environment } from 'src/environments/environment';
import { CreateNewTimeSheetModel } from './models/createNewTimeSheetModel';
import { RestfulapiService } from '../shared/services/restfulapi.service';

@Injectable()
export class TimeSheetService {



  constructor(private restfulApiService: RestfulapiService) {

  }

  public createNewTask = (timeEntry: CreateNewTimeSheetModel):Observable<any> => {
    let config: RestfulApiConfig = {
      url: `${environment.apiBaseUrl}v1/Task/AddNewTask`,
      body: timeEntry
    };
    return this.restfulApiService.post(config);
  }

  public fetchTasks = (query: string): Observable<any[]> => {
    let config: RestfulApiConfig = {
      url: `${environment.apiBaseUrl}v1/Task/Search?searchToken=${query}`,
    };
    return this.restfulApiService.get<any[]>(config).pipe(
      debounceTime(300),  // Adding debounce time for better performance
      switchMap(() => this.restfulApiService.get<any[]>(config)))
  }


}
