import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor( public httpService: HttpService) {}
     
  getNoteListCall()
  {
    return this.httpService.getNoteList()
  }

  addNoteCall(data: object)
  {
    return this.httpService.addNote(data);
  }
  archiveNoteCall(data: object)
  {
    return this.httpService.archiveNote(data);
  }
  getArchivedNotesCall() {
    return this.httpService.getArchivedNotes();
  }

  deleteNoteCall(data: object)
  {
    return this.httpService.deleteNote(data);
  }

  getDeletedNotesCall(){
    return this.httpService.getDeletedNotes();
  }


  deleteForeverCall(data: object){
    return this.httpService.deleteForever(data);
  }

  changeColorCall(data: object){
    return this.httpService.changeColor(data);
  }
}
