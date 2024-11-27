import { CreateNewTimeSheetModel } from './models/createNewTimeSheetModel';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from './models/createTaskModel';
import { TimeSheetService } from './timesheet.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss'
})
export class TimesheetComponent implements OnInit{
  public timesheetForm: FormGroup;
  public maxDate?: Date;
  public minDate?:Date;
  public minDateForEndTime?:Date;
  public maxDateForEndTime?:Date;
  public taskCollection: Task[] = [];
  filteredTasks: any[] = [];

  constructor(private timeSheetService: TimeSheetService, private messageService: MessageService) {
    this.timesheetForm = new FormGroup({
      task: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDateForEndTime = new Date();
    this.minDate?.setMonth(new Date().getMonth() - 1);
    this.minDateForEndTime?.setMonth(new Date().getMonth() - 1);
  }

  public onStartTimeSelect = (value: Date) => {
    this.minDateForEndTime = value
  }

  public search = (event: any) => {
    const query = event.query;

    // Make an HTTP request to fetch filtered task list
    this.timeSheetService.fetchTasks(query).subscribe((tasks: any[]) => {
      this.filteredTasks = tasks;
    });
  }



  public onSubmitTimeSheet = (): void => {
    let startTime = this.timesheetForm.get('startTime')?.value;
    let endTime = this.timesheetForm.get('endTime')?.value;
    let taskId = this.timesheetForm.get('task')?.value?.taskId

    let createRequest: CreateNewTimeSheetModel = {
      employeeId: 1,
      startTime: startTime,
      endTime: endTime,
      taskId: taskId
    }
    debugger
    this.timeSheetService.createNewTask(createRequest).subscribe({
      next: (value) => {
        this.taskCollection.push(new Task(this.timesheetForm.get('task')?.value?.taskName, this.formatTaskDate(startTime), this.formatTaskDate(endTime)))
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Task Added Successfully!'});
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to Add Task!'});
      }
    })



  }

  private formatTaskDate = (date: Date): string => {
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
};

    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate;
  }

}
