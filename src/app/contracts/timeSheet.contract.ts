export interface Task {
  createdAt: Date;
  name: string;
  id: number;
}

export interface TimeSheet {
  task: Task;
  start: string;
  end: string;
}
