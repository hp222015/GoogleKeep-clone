import { Component, EventEmitter, Output } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';
import { ShiftService } from 'src/app/services/shift-service/shift.service';
import { HttpService } from 'src/app/services/http-service/http.service';

// we need to create interface bcoz in typescript we can't directly access the 
// object details using '.' operator like NoteObj.title we need to define the 
// interface for that;
interface NoteObj {
  "title":string,
  "description":string,
  "color": string,
  "id":string,
  "isArchived": boolean,
  "isDeleted": boolean
}
interface objData{
  "action":string,
  "data": NoteObj
}
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})

export class CreateNoteComponent  {
  takeNote: boolean=true
  title:string =""
  description: string=""
  color: string=""
  @Output() updateList= new EventEmitter <objData>();

  constructor(public noteService:NoteService, public shiftService:ShiftService, public httpService:HttpService){
    
  }

  changeColor(color: string) {
    this.color=color;
  }
 
  handleCreateNote(action : string ){
   
    this.takeNote=!this.takeNote
    this.shiftService.check(this.takeNote);
    if (action =='close'){
        const noteObj:NoteObj = {
          "title" : this.title,
          "description" : this.description,
          "color": this.color,
          "id":"12346",
          "isArchived": false,
          "isDeleted": false          
        };
      const emitObj: objData ={
        action: 'addNote',
        data: noteObj
      };
      this.noteService.addNoteCall(noteObj).subscribe(result=>{
        this.updateList.emit(emitObj);
        this.httpService.getNoteList();
      });
    }
    
  }
}
