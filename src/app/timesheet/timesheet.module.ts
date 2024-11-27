import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet.component';
import { TimeSheetRouteModule } from './timesheet.route.module';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { TimeSheetService } from './timesheet.service';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'primeng/calendar'
import { TableModule } from 'primeng/table'
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [TimesheetComponent],
  imports: [
    CommonModule,
    TimeSheetRouteModule,
    InputTextModule,
    ReactiveFormsModule,
    SharedModule,
    CalendarModule,
    TableModule,
    AutoCompleteModule,
    ToastModule
  ],
  providers: [provideHttpClient(), TimeSheetService, MessageService],
  exports: [TimesheetComponent]
})
export class TimesheetModule { }
