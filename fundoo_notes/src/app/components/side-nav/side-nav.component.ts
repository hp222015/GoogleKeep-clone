import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ARCHIVE_ICON, DELETE_FOREVER_ICON, EDIT_ICON, NOTE_ICON, REMINDER_ICON, TRASH_ICON } from 'src/app/assets/svg-icons';
import { DataService } from 'src/app/services/data-service/data.service';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  host:{
    class: "app-side-nav-cnt"
  }
})

export class SideNavComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  drawerState : boolean = false;
  highlightedDiv: HTMLElement | null = null;
  constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dataService: DataService, public noteService:NoteService, public router: Router) {
    iconRegistry.addSvgIconLiteral('note-icon', sanitizer.bypassSecurityTrustHtml(NOTE_ICON));
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('edit-icon', sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));

     }
    archiveClick()
    {
      this.router.navigate(['/dashboard/archive']);
    }
    highlight(div: HTMLElement) {
      if (this.highlightedDiv) {
        this.highlightedDiv.classList.remove('highlighted');
      }
      div.classList.add('highlighted');
      this.highlightedDiv = div;
    }
  
    isHighlighted(div: HTMLElement) {
      return div === this.highlightedDiv;
    }
    deleteClick()
    {
      this.router.navigate(['/dashboard/trash']);
    } 


  
  ngOnInit(): void {
    this.subscription=this.dataService.currentDrawerState.subscribe((result)=>this.drawerState=result)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
