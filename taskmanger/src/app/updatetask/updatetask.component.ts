import { Component, OnInit } from '@angular/core';
import{Task} from '../module/task'
import {Project} from '../module/project'
import{User} from '../module/user';
import{TaskmanagerService} from '../service/taskmanager.service';
import {ProjectService} from '../service/project.service';
import{UserService} from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {

	taskId:string;
	task:Task;
  taskList : Array<Task>
  sDateString:string;
  eDateString: string;
  errMessage: string;

  constructor(private taskService : TaskmanagerService, private prjService : ProjectService,
                private  userService : UserService,private route: ActivatedRoute, private router:Router) {
    this.taskService.fetchTaskFromServer();
  }

  ngOnInit() {
    this.task = new Task();
  	this.taskId = this.route.snapshot.paramMap.get('taskId');

    this.taskService.getTasks()
              .subscribe((data) => {
                this.taskList = data;
              });

    this.taskService.getTaskById(this.taskId)
  	.subscribe(data => {
  		  this.task =data;
        this.sDateString=this.task.startDate.toString();
        this.eDateString=this.task.endDate.toString();
  		  console.log(this.task);
  		})
  }


updateTask(taskId:string, task:Task) {
    this.errMessage = '';
    const msg = 'Please fill all the fields';

    if ( this.task === null || typeof(this.task) === 'undefined') {
      this.errMessage = msg;
      return false;
    }

    if (this.task.taskName) {
     if ( this.task.taskName === null || typeof(this.task.taskName) === 'undefined') {
      this.errMessage = msg;
      return false;
    }
    }else {
      if ( this.task.taskName === null || this.task.priority === null  || typeof(this.task.taskName) === 'undefined'
      || typeof(this.task.priority) === 'undefined' ) {
      this.errMessage = msg;
      return false;
      }

    if ( this.task.parentTaskName.trim() === '' || this.task.parentTaskName.trim() === '') {
      this.errMessage = msg;
      return false;
      }
    }
    this.taskService.updateTask(taskId,task).subscribe(() => {
      this.task = new Task();
    },
    err => {
      this.errMessage = err.message;
    });

   this.router.navigate(['/viewTask'])
  }

}
