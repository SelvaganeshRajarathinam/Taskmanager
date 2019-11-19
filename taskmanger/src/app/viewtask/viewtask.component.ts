import { Component, OnInit } from '@angular/core';
import{Task} from '../module/task';
import{TaskmanagerService} from '../service/taskmanager.service';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ReactiveFormsModule, FormControl, FormsModule } from "@angular/forms";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";


@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  task : Array<Task>;
  taskMessage : Task;
  message:string;
  searchText:string;
  key: string = 'taskTitle'; //set default
  reverse: boolean = false;

  constructor(private taskService : TaskmanagerService)
  {
 	    this.taskService.fetchTaskFromServer();
  }

  ngOnInit() {
  	  this.taskService.getTasks()
  	  				.subscribe( (data) => {
  	  					this.task = data;
  	  				});
  }

  endTask(taskId : string) {
  	console.log("task id is" + taskId)
  	this.taskService.endTask(taskId)
  	.subscribe((data) => {
  		console.log(data);
  		this.message = "End task is succesfully done";
  		this.taskService.fetchTaskFromServer();
  	},
  	 (error) => {
  	 	console.log(error);
  	 	this.message = "Close the sub task before the parent task";
  	 }
  	);
  }

  search() {
    console.log(this.searchText)
     this.taskService.getTaskByProjects(this.searchText);
           this.taskService.getTasks()
              .subscribe( (data) => {
                this.task = data;
              });
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

}
