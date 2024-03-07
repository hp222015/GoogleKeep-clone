import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';
import { ViewService } from 'src/app/services/view-service/view.service';

// interface is create because in typescript the object that we get either we need to define its type any
// or we need to display the entire type of the object so that we can access various fields of that object
// for example we can't directly access NoteObj.id if we haven't created the object interface, this can 
// be done only if either we define type of NoteObj as any or we define it interface.
interface NoteObj {
  title: string,
  description: string,
  color: string,
  id: string,
  isArchived: boolean,
  isDeleted: boolean
}

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.css']
})
export class TrashContainerComponent {
  deletedNotes: NoteObj[]= [];
  viewMode: boolean=true;

  constructor(public noteService: NoteService , public viewService:ViewService) {
    this.getDeletedNotes(); 
    this.viewService.viewMode$.subscribe(mode => this.viewMode=mode)
  }

  getDeletedNotes(): void {
    this.noteService.getDeletedNotesCall().subscribe(
      (result: any)=>{
        this.deletedNotes=result.data.data;
       console.log(this.deletedNotes);},
      error => {
        console.error('Error fetching deleted notes:', error);
      }
    );
  }
}
  