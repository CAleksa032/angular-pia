import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserActivityService } from '../services/user-activity.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private userActivityService: UserActivityService, private router: Router) { }

  ngOnInit(): void {
    this.userActivityService.getUserActivity().subscribe(() => {
      alert('Your session has expired. You will be logged out.');
      this.logout()
    });
  }

  logout(): void {
    this.userService.logout()
    this.userActivityService.getUserActivity().unsubscribe()
    this.router.navigate(['/']);
  }
}
