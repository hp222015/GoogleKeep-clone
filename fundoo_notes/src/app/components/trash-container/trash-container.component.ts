import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';


interface NoteObj {
  title: string;
  description: string;
  color: string;
  id: string;
  isArchived: boolean;
}

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.css']
})
export class TrashContainerComponent {
  // archivedNotes: NoteObj[]= [];

  // constructor(public noteService: NoteService) { }

  // ngOnInit(): void {
  //   this.getArchivedNotes();
  // }

  // getArchivedNotes(): void {
  //   this.noteService.getArchivedNotesCall().subscribe(
  //     (result: any)=>{
  //       this.archivedNotes=result.data.data;
  //      console.log(this.archivedNotes);},
  //     error => {
  //       console.error('Error fetching archived notes:', error);
  //     }
  //   );
  // }
}
  