import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-keep-view',
  templateUrl: './keep-view.component.html',
  styleUrls: ['./keep-view.component.css']
})
export class KeepViewComponent implements OnInit, OnDestroy{
 subscription!:Subscription
 drawerState : boolean = false
 constructor( public dataService:DataService){

 } 
  ngOnInit(): void {
    this.subscription= this.dataService.currentDrawerState.subscribe(result=>this.drawerState=result)
  }
  handleDrawerState(){
    this.dataService.updateDrawerState(!this.drawerState);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

