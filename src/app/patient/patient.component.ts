import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserActivityService } from '../services/user-activity.service';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private userActivityService: UserActivityService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.userActivityService.getUserActivity().subscribe(() => {
      alert('Your session has expired. You will be logged out.');
      this.logout()
    });
  }

  

  userString = sessionStorage.getItem('user');
  user = JSON.parse(this.userString) as User;
  subscription

  logout(): void {
    this.userService.logout()
    this.subscription.unsubscribe()
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
