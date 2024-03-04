import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import {Observable} from 'rxjs';

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
  getArchivedNotesCall(): Observable<any> {
    return this.httpService.getArchivedNotes();
  }
}
