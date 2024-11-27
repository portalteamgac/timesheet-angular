import { RouterModule, Routes } from "@angular/router";
import { TimesheetComponent } from "./timesheet.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: '', component: TimesheetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeSheetRouteModule { }
