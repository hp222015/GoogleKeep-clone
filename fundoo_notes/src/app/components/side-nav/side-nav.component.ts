import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ARCHIVE_ICON, DELETE_FOREVER_ICON, EDIT_ICON, NOTE_ICON, REMINDER_ICON } from 'src/app/assets/svg-icons';
import { DataService } from 'src/app/services/data-service/data.service';

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
  drawerState : boolean = false
  constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dataService: DataService) {
    iconRegistry.addSvgIconLiteral('note-icon', sanitizer.bypassSecurityTrustHtml(NOTE_ICON));
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('edit-icon', sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('delete-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));

     }
  ngOnInit(): void {
    this.subscription=this.dataService.currentDrawerState.subscribe((result)=>this.drawerState=result)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
