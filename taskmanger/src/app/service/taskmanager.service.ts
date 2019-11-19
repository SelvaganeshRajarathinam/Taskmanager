import { Injectable }     from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }     from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import{Task} from '../module/task'
import 'rxjs/add/operator/catch';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskmanagerService {

	task:Array<Task>;
	taskSubject: BehaviorSubject<Array<Task>>;
	api = 'http://localhost:8080/api';
	header: HttpHeaders;

	constructor(private httpService: HttpClient) {
		this.taskSubject = new BehaviorSubject<Array<Task>>([]);
		this.task = Array<Task>();
	}

	fetchTaskFromServer() {
		this.header = new HttpHeaders();
		this.header.append( 'Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
		return this.httpService.get<Task[]>(this.api + '/tasks', {headers :this.header})
		 .subscribe((data) => {
      console.log("Response: "+ data);
		 	this.task = data;
		 	this.taskSubject.next(this.task);
		 },
		 (error) => {
		 	console.log(error);
		 });
	}

	getTasks() :BehaviorSubject<Array<Task>>  {
		return this.taskSubject;
	}


	endTask(taskId: string): Observable<Task> {
    	this.header = new HttpHeaders();
		this.header.append( 'Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
    return this.httpService
               .put<Task>(this.api + '/endtaskbyId' + `/${taskId}`,  {headers: this.header});
  }

   addTask(task: Task): Observable<Task> {
        this.header = new HttpHeaders();
		this.header.append( 'Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
    return this.httpService.post<Task>(this.api + '/addtask', task, {headers: this.header});
  }

   updateTask(taskId:string, task: Task): Observable<Task> {
        this.header = new HttpHeaders();
		this.header.append( 'Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
    return this.httpService.put<Task>(this.api + '/updatetask' + `/${taskId}`, task, {headers: this.header});
  }


  getTaskById(taskId): Observable<Task> {
            this.header = new HttpHeaders();
		this.header.append( 'Content-Type', 'application/json');
		this.header.append('Accept', 'application/json');
    return this.httpService.get<Task>(this.api + '/gettaskbyId' + `/${taskId}`, {headers: this.header});
  }

  getTaskByProjects(term:string){
  	 this.header = new HttpHeaders();
  	 this.header.append('Content-Type', 'application/json');
  	 this.header.append('Accept','application/json');
  	 return this.httpService.get<Task[]>(this.api + '/gettaskbyproject' + `/${term}`, {headers:this.header})
		 .subscribe((data) => {
		 	this.task = data;
		 	this.taskSubject.next(this.task);
		 },
		 (error) => {
		 	console.log(error);
		 });
	}
}
