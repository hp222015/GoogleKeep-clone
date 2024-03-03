import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // BehaviorSubject is a type of Observable provided by RxJS. 
  // It is a special type of Observable that stores the current 
  // value and emits  it to new subscribers immediately upon subscription.
  private drawerState = new BehaviorSubject(false);
  currentDrawerState = this.drawerState.asObservable();
  // By using asObservable(), we expose it in a way that other parts of the 
  // application can subscribe to changes, but cannot directly update its value.

  constructor() { }

  updateDrawerState(state: boolean) {
    this.drawerState.next(state)
  }
}
