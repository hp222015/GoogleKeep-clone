// import { Component, Input} from '@angular/core';
// import { MatIconRegistry } from '@angular/material/icon';
// import { DomSanitizer } from '@angular/platform-browser';
// import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, MORE_ICON, REMINDER_ICON } from 'src/app/assets/svg-icons';
// import { NoteService } from 'src/app/services/note-service/note.service';
// import { HttpService } from 'src/app/services/http-service/http.service';
// interface NoteObj {
//   "title":string,
//   "description":string,
//   "color": string,
//   "id":string,
//   "isArchived": boolean
// }

// @Component({
//   selector: 'app-notecard',
//   templateUrl: './notecard.component.html',
//   styleUrls: ['./notecard.component.css']
// })
// export class NotecardComponent{
  
//   @Input() noteDetails!: NoteObj
 
//   constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer , public httpService: HttpService) {
//     console.log(this.noteDetails);
//     iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
//     iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
//     iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
//     iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
//     iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
//     iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));

//      }
//      archiveNote(): void {
//       // Update the isArchived property of the note
//       this.noteDetails.isArchived = true;
  
//       // Call a method to update the note on the backend
//       this.updateNoteOnBackend(this.noteDetails.id);
//     } 

//     updateNoteOnBackend(noteId: string): void {
//       // Call your NoteService method to update the note on the backend
//       // Pass the noteId to identify the note to be updated
//       this.httpService.archiveNote(noteId).subscribe(
//         () => {
//           console.log('Note archived successfully');
//           // Optionally, you can perform additional actions after archiving the note
//         },
//         error => {
//           console.error('Error archiving note:', error);
//         }
//       );
//     }
  
// }


import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http-service/http.service';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON } 
from 'src/app/assets/svg-icons';
interface NoteObj {
    "title":string,
    "description":string,
    "color": string,
    "id":string,
    "isArchived": boolean
  }

@Component({
  selector: 'app-notecard',
  templateUrl: './notecard.component.html',
  styleUrls: ['./notecard.component.css']
})
export class NotecardComponent {
  @Input() noteDetails!: NoteObj;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private httpService: HttpService
  ) {
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
  }

  archiveNote(noteDetails : any): void {
   
    // Update the isArchived property of the note
    this.noteDetails.isArchived = true;
    console.log(noteDetails);
     const obj1={
      "noteIdList":[this.noteDetails.id],
      "isArchived":true
     }


    // Call a method to update the note on the backend
    this.updateNoteOnBackend(obj1);
  }

  updateNoteOnBackend(obj2:object): void {
    this.httpService.archiveNote(obj2).subscribe(
      () => {
        console.log('Note archived successfully');
      },
      error => {
        console.error('Error archiving note:', error);
      }
    );
  }
}