import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelogsComponent } from './timelogs.component';
import { HttpService } from '../services/http.service';

const routes: Routes = [{ path: '', component: TimelogsComponent }];

@NgModule({
  providers: [HttpService],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelogsRoutingModule { }
