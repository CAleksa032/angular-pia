import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserActivityService } from '../services/user-activity.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private userService: UserService, private userActivityService: UserActivityService, private router: Router) { }



  ngOnInit(): void {
    this.subscription = this.userActivityService.getUserActivity().subscribe(() => {
      alert('Your session has expired. You will be logged out.');
      this.logout()
    });
  }

  subscription

  logout(): void {
    this.userService.logout()
    this.subscription.unsubscribe()
    this.router.navigate(['/']);
  }

  navigateToPasswordForm(): void{
    this.router.navigate(['/passwordchange'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
