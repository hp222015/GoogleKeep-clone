import { Component, Input,Output,EventEmitter} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http-service/http.service';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON,  TRASH_ICON, UNARCHIVE_ICON, RESTORE_ICON, DELETE_FOREVER_ICON } 
from 'src/app/assets/svg-icons';
import { NoteService } from 'src/app/services/note-service/note.service';
import { ShiftService } from 'src/app/services/shift-service/shift.service';

interface NoteObj {
    "title":string,
    "description":string,
    "color": string,
    "id":string,
    "isArchived": boolean,
    "isDeleted" : boolean
  }

  interface objData{
    "action":string,
    "data": NoteObj
  }

@Component({
  selector: 'app-notecard',
  templateUrl: './notecard.component.html',
  styleUrls: ['./notecard.component.css']
})
export class NotecardComponent{
  @Input() noteDetails!: NoteObj;
  @Input() viewMode: boolean=true; 
  @Output() updateNoteList = new EventEmitter<objData>();
  @Output() updateArchiveList = new EventEmitter<NoteObj>();
  @Output() updateTrashList = new EventEmitter<NoteObj>();
  takeNote: boolean=true;

  

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public httpService: HttpService,
    public  noteService: NoteService,
    public shiftService: ShiftService
  ) {
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));    
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    this.shiftService.shiftReqd$.subscribe((result)=>this.takeNote=result);
  }
  
  
  archiveNote(noteDetails : any): void {
   
    this.noteDetails.isArchived = true;
    console.log(noteDetails);
     const obj1={
      "noteIdList":[this.noteDetails.id],
      "isArchived":true
     }
     const emitObj={
      action:"archiveNote",
      data: noteDetails
     }
     this.noteService.archiveNoteCall(obj1).subscribe(
      ()=>{
      console.log("Note Archived successfully");
      this.updateNoteList.emit(emitObj);
     },
     error => {console.error('Error:',error);}
    );
    
    
  }
  unarchiveNote(noteDetails : any): void {
   
    this.noteDetails.isArchived = false;
    console.log(noteDetails);
     const obj1={
      "noteIdList":[this.noteDetails.id],
      "isArchived":false
     }
     this.noteService.archiveNoteCall(obj1).subscribe(
      ()=>{
      console.log("Note unArchived successfully"); 
      this.updateArchiveList.emit(noteDetails);     
     },
     error => {console.error('Error:',error);}
    );
  }

  deleteNote(noteDetails : any): void{
    this.noteDetails.isDeleted = true;
    console.log(noteDetails);
    const obj1={
      "noteIdList":[this.noteDetails.id],
      "isDeleted":true
    }
    const emitObj={
      action:"archiveNote",
      data:noteDetails
     }
    this.noteService.deleteNoteCall(obj1).subscribe(
      ()=>{
      console.log("Note Deleted successfully");
      this.updateNoteList.emit(emitObj);
      this.updateArchiveList.emit(noteDetails);
    },
      error =>{console.log(error);}
    );
    
  }

  restoreNote(noteDetails : any): void{
    this.noteDetails.isDeleted = false;
    console.log(noteDetails);
    const obj1={
      "noteIdList":[this.noteDetails.id],
      "isDeleted":false
    }
    this.noteService.deleteNoteCall(obj1).subscribe(
      ()=>{console.log("Note restored successfully");
      this.updateTrashList.emit(noteDetails);},
      error =>{console.log(error);}
    );
    
  }

  deletePermanently(noteDetails : any): void{
    const obj1={
      "noteIdList":[this.noteDetails.id],
    }
    this.noteService.deleteForeverCall(obj1).subscribe(
      ()=>{
        console.log("Note Deleted permanently");
      this.updateTrashList.emit(noteDetails);
    },
      error =>{console.log(error);}
    );
    
  }

  changeColor(color: string) {
    this.noteDetails.color = color;
    const obj1={
    "noteIdList":[this.noteDetails.id],
    "color":this.noteDetails.color    
    }
    this.noteService.changeColorCall(obj1).subscribe(()=>{
    console.log("Note colored");
  },
    error =>{console.log(error);}
    );
  }
  
}