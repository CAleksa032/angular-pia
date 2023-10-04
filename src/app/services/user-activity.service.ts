import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  private userActivity: Subject<void> = new Subject<void>();
  private timeoutId: any;
  private inactivityPeriod = 300000; // 5 minutes in milliseconds 300000 // 5000 - 5 sec

  constructor() {
    this.resetTimer();
    this.setupListeners();
  }

  private setupListeners(): void {
    ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'].forEach((event) => {
      window.addEventListener(event, () => {
        this.resetTimer();
      });
    });
  }

  private resetTimer(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.userActivity.next(), this.inactivityPeriod);
  }

  getUserActivity(): Subject<void> {
    return this.userActivity;
  }
}
