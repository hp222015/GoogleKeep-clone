import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  // BehaviorSubject has an initial value and emits the current value
  // to new subscribers, along with subsequent changes.
  private viewModeSubject = new BehaviorSubject<boolean>(true); // Default to grid view
  viewMode$ = this.viewModeSubject.asObservable();

  toggleViewMode(viewMode: boolean) {
    this.viewModeSubject.next(viewMode);
    // This next method is used to emit the next value to subscribers of the viewModeSubject
  }
  constructor() { }
}
