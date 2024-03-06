import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { OTHER_MENU_ICON} from 'src/app/assets/svg-icons';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-keep-view',
  templateUrl: './keep-view.component.html',
  styleUrls: ['./keep-view.component.css']
})
export class KeepViewComponent implements OnInit, OnDestroy{
 subscription!:Subscription
 drawerState : boolean = false
 gridView : boolean =true
 ListView :boolean =false
 constructor( public dataService:DataService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
  iconRegistry.addSvgIconLiteral('grid-view', sanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON));
 } 
  ngOnInit(): void {
    this.subscription= this.dataService.currentDrawerState.subscribe(result=>this.drawerState=result)
  }
  handleDrawerState(){
    this.dataService.updateDrawerState(!this.drawerState);
  }
  handleView(){
    this.gridView=!this.gridView;
     
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

