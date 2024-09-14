import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { CalendarModule } from 'primeng/calendar';
import { TimelogsRoutingModule } from './timelogs.routing.module';
import { TimelogsComponent } from './timelogs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    TimelogsComponent
  ],
  imports: [
    CommonModule,
    TimelogsRoutingModule,
    ReactiveFormsModule,
    TableModule,
    CalendarModule,
    ButtonModule,
    AutoCompleteModule,
    MessagesModule
  ]

})
export class TimelogsModule { }
