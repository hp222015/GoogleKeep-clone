import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { OTHER_MENU_ICON} from 'src/app/assets/svg-icons';
import { DataService } from 'src/app/services/data-service/data.service';
import { UserService } from 'src/app/services/user_services/user.service';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/services/view-service/view.service';

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
 constructor( public dataService:DataService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public userService: UserService, public router: Router, private viewService: ViewService){
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
    this.viewService.toggleViewMode(this.gridView);   
  }
  logoutUser(){
    this.userService.logoutUser().subscribe(()=>
    {
      console.log("User logged Out");
      this.router.navigate(["/login"]);
    }, 
    (error) => 
    {
      console.log(error);
    });
    
    
  }
  f1(){
    window.location.reload();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

