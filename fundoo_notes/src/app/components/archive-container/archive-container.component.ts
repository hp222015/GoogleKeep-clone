// archive.component.ts
import { Component} from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';
import { ViewService } from 'src/app/services/view-service/view.service';

interface NoteObj {
  title: string,
  description: string,
  color: string,
  id: string,
  isArchived: boolean,
  isDeleted: boolean
}


@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.css']
})
export class ArchiveContainerComponent {
  archivedNotes: NoteObj[]= [];

 viewMode: boolean=true;

  constructor(public noteService: NoteService, public viewService: ViewService) 
  { 
    this.viewService.viewMode$.subscribe(mode => this.viewMode = mode);

  }

  ngOnInit(): void {
    this.getArchivedNotes();
  }

  getArchivedNotes(): void {
    this.noteService.getArchivedNotesCall().subscribe(
      (result: any)=>{
        this.archivedNotes=result.data.data;
        this.archivedNotes=this.archivedNotes.filter(notes => notes.isArchived && !notes.isDeleted);
      },
      error => {
        console.error('Error fetching archived notes:', error);
      }
    );
  }
  updateArchiveList($event:NoteObj ){
    this.archivedNotes=this.archivedNotes.filter((noteObj)=>{

      return noteObj.id!=$event.id;
    });
    console.log($event);
  }

}