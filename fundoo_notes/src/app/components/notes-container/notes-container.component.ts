import {  Component} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ARCHIVE_ICON, BRUSH_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, MORE_ICON, REDO_ICON, REMINDER_ICON, TICK_ICON, UNDO_ICON } from 'src/app/assets/svg-icons';
import { NoteService } from 'src/app/services/note-service/note.service';
import { ViewService } from 'src/app/services/view-service/view.service';
import { ChangeDetectorRef } from '@angular/core';

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
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.css']
})
export class NotesContainerComponent {
  noteList:NoteObj[]=[]
  viewMode: boolean=true;
  

  constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public noteService: NoteService, private viewService:ViewService,private changeDetectorRef: ChangeDetectorRef) {
    iconRegistry.addSvgIconLiteral('tick-icon', sanitizer.bypassSecurityTrustHtml(TICK_ICON));
    iconRegistry.addSvgIconLiteral('brush-icon', sanitizer.bypassSecurityTrustHtml(BRUSH_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('undo-icon', sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
    iconRegistry.addSvgIconLiteral('redo-icon', sanitizer.bypassSecurityTrustHtml(REDO_ICON));
    this.viewService.viewMode$.subscribe(mode => this.viewMode = mode);

  }
  ngOnInit(): void {      
    this.getAllNotes();
  }

  getAllNotes(){
    this.noteService.getNoteListCall().subscribe((result: any)=>{
      this.noteList=result.data.data;     
      this.noteList=this.noteList.filter(notes => !notes.isArchived && !notes.isDeleted);
      
      },(error)=>{console.log(error)});   

  }

  updateNoteList($event:objData ){
    // this.noteList=[$event, ...this.noteList];
    // this.noteList=this.noteList.filter((noteObj)=>{

    //   return noteObj.id!=$event.id;
    // });
    // map logic for color change make obj= {action: string, data: NoteObj} and emit it 
    console.log($event.data);
    if($event.action==='addNote')
    {
      this.noteList=[$event.data, ...this.noteList];      
    }
    if($event.action==='archiveNote')
    {
          this.noteList=this.noteList.filter((noteObj)=>{

          return noteObj.id!=$event.data.id;
        });
    }
  }

}
