import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Task, TimeSheet } from '../contracts';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-timelogs',
  templateUrl: './timelogs.component.html',
  styleUrls: ['./timelogs.component.scss']
})
export class TimelogsComponent implements OnInit {
  public messages: Message[] = [];

  timesheetFormGroup!: FormGroup;
  public tasks: Task[] = [];
  public isSaving = false;
  public taskInput$ = new Subject<string>();
  public logs: TimeSheet[] = [];


  private subscriptions: Subscription[] = [];

  constructor(private timeSheetService: HttpService, private cd: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.initializeForm();
    this.setupTaskAutoComplete();
    this.fetchLogs();
  }


  initializeForm() {
    this.timesheetFormGroup = new FormGroup({
      task: new FormControl('', Validators.required),
      timeStart: new FormControl('', [Validators.required]),
      timeEnd: new FormControl('', [Validators.required, this.endAfterStartValidator])
    });
  }

  setupTaskAutoComplete() {
    this.taskInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name => this.timeSheetService.fetchTasks(name))
    ).subscribe((tasks: Task[]) => this.tasks = tasks);
  }

  endAfterStartValidator(control: FormControl): { [key: string]: boolean } | null {
    const formGroup = control.parent;
    if (formGroup) {
      const startTime = formGroup.get('timeStart')?.value;
      const endTime = formGroup.get('timeEnd')?.value;
      if (startTime && endTime && startTime >= endTime) {
        return { 'endBeforeStart': true };
      }
    }
    return null;
  }

  clearMessages() {
    setTimeout(() => {
      this.messages = [];
    }, 3000);
  }


  public onSubmit() {
    if (this.timesheetFormGroup.invalid) {
      return;
    }

    this.isSaving = true;
    const payload: TimeSheet = {
      task: this.timesheetFormGroup.value.task,
      start: this.timesheetFormGroup.value.timeStart,
      end: this.timesheetFormGroup.value.timeEnd
    };

    this.subscriptions.push(this.timeSheetService.saveTimeSheet(payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.messages = [{ severity: 'success', summary: 'Success', detail: 'Log saved successfully' }];
      },
      error: () => {
        this.isSaving = false;
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'Failed to save log' }];
      }
    }));
  }

  public fetchLogs() {
    const logSubscription = this.timeSheetService.getTimeLogs().subscribe({
      next: (logs: TimeSheet[]) => {
        this.logs = logs;
        this.cd.detectChanges();
      },
      error: () => {
        this.messages = [{ severity: 'error', summary: 'Error', detail: 'Failed to load logs' }];
      }
    });

    this.subscriptions.push(logSubscription);
  }

  public filterTasks(event: any) {
    this.taskInput$.next(event.query);
  }
}
