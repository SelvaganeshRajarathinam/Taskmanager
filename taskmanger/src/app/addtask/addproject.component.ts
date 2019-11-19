import { Component, OnInit } from '@angular/core';
import {Project} from '../module/project';
import {Task} from '../module/task';
import {ProjectService} from '../service/project.service';
import{TaskmanagerService} from '../service/taskmanager.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

    project : Project;
    task : Task;
    prjList : Array<Project>;
    sDateString: string;
    eDateString: string;
    errMessage: string;
    searchText:string;
    //task : Array<Task>;
    key: string = 'projectName'; //set default
    reverse: boolean = false;

  constructor(private taskService : TaskmanagerService, private prjService : ProjectService) {
  	//this.prjService.fetchProjectFromServer();
  }

  ngOnInit() {
  	this.project = new Project();
    this.task = new Task();

  	if(!this.project.startDate)
        this.project.startDate=new Date();
    this.sDateString=this.project.startDate.toISOString().substring(0,10);


    if(!this.project.endDate)
        this.project.endDate=new Date();
    this.eDateString=this.project.endDate.toISOString().substring(0,10);

    this.prjService.getProjects()
    .subscribe((data) => {
        this.prjList = data;
      });
  }


 updateDates() {
  	this.task.startDate=this.sDateString;
  	this.task.endDate=this.eDateString;
  }

 search() {
    console.log(this.searchText)
     this.prjService.searchProjects(this.searchText);
           this.prjService.getProjects()
              .subscribe( (data) => {
                this.prjList = data;
              });
  }

 sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

   cancel() {
     console.log("Clearing the fields");
   }

   addTask(taskName:string, task:Task) {
    console.log("Reached the add task method -- addproject.component.ts "+this.task.taskName);
    console.log("priority: " + this.task.priority);
    console.log("Parent: " + this.task.parentTaskName);
    console.log("Reached the add task method -- addproject.component.ts "+this.sDateString);
    console.log("endDate: " + this.eDateString);
    this.errMessage = '';
    const msg = 'Please fill the mandatory fields';

    if ( this.task === null || typeof(this.task) === 'undefined') {
      this.errMessage = msg;
      return false;
    }

    if ( this.task.taskName === null || this.task.priority === null  || typeof(this.task.taskName) === 'undefined'
      || typeof(this.task.priority) === 'undefined' ) {
        this.errMessage = msg;
        return false;
    }

    if ( this.task.parentTaskName.trim() === '' || this.task.taskName.trim() === '') {
      this.errMessage = msg;
      return false;
    }

    if(this.task.startDate > this.task.endDate){
       this.errMessage ='End Date cannot be before the start date';
    }

   if(this.task != null) {
       console.log("Calling the Spring Rest POST API now");
       console.log("S Date:"+this.task.parentTaskName);
       console.log("E Date:"+this.task.endDate);
       this.prjService.addTasks(this.task).subscribe(() => {
          this.task = new Task();
       },
    err => {
      this.errMessage = err.message;
    });
  }
}

  deleteProject(id:string){
     this.prjService.deleteProject(id)
     .subscribe((data) => {
         this.project =data;
         this.errMessage = this.project.message;
       });
   }

   editProject(id:string) {
    this.project = this.prjList.find(x => x.projectId == id)
    this.sDateString=this.project.startDate.toString();
    this.eDateString=this.project.endDate.toString();
    if(this.project.endDate) this.project.IsDate=true;
   }

}
