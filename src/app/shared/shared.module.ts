import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestfulapiService } from './services/restfulapi.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
  ],
  providers: [RestfulapiService, provideHttpClient()],
  exports: [
    FormsModule,
  ]
})
export class SharedModule { }
