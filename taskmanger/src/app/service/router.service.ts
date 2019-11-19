import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router, private location: Location) { }


    routeToEditNoteView(noteId) {
    this.router.navigate(['dashboard', {outlets: {noteEditOutlet: [ 'note', noteId, 'edit' ]}}]);
  }


}
