import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule, FormControl, FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import{TaskmanagerService} from './service/taskmanager.service';
import {ProjectService} from './service/project.service';
import {UserService} from './service/user.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { AddprojectComponent } from './addtask/addproject.component';

const appRoutes:Routes = [
  {path:'viewTask', component:ViewtaskComponent},
  {path:'updateTask/:taskId', component:UpdatetaskComponent},
  {path:'addproject', component:AddprojectComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ViewtaskComponent,
    UpdatetaskComponent,
    AddprojectComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    Ng2OrderModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  TaskmanagerService,
  ProjectService,
  UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
