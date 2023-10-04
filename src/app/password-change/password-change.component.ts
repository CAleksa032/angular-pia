import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { NgForm } from '@angular/forms';
import { UserActivityService } from '../services/user-activity.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  constructor(private userService: UserService,  private router: Router, private userActivityService: UserActivityService) { }

  ngOnInit(): void {
    this.subscription = this.userActivityService.getUserActivity().subscribe(() => {
      alert('Your session has expired. You will be logged out.');
      this.logout()
    });
  }

  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  subscription

  message: string;

  passwordsDontMatch(): boolean {
    return !(this.newPassword === this.confirmNewPassword) 
  }

  isPasswordValid() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z][\w.@$!%*#?&]{6,11}$/;
    return passwordPattern.test(this.newPassword);
  }

  isFormValid(): boolean {
    return this.isPasswordValid() && !this.passwordsDontMatch() ;
  }
  
  submitForm(form: NgForm) {
    this.tryChange();
  }

  tryChange(){
    let userString = sessionStorage.getItem('user');
    let user = JSON.parse(userString) as User;

    this.userService.tryChange(user.username, this.oldPassword, this.newPassword).subscribe( respObj =>{
      if(respObj['message'] == 'success'){
        alert('Password change successful. Please login again.')
        this.logout()
      }
      else if(respObj['message'] == 'nomatch'){
        this.message = 'Old password incorect'
      }else if(respObj['message'] == 'Error'){
        this.message = 'Something went wrong please try again'
      }
    })

  }

  logout(): void {
    this.userService.logout()
    this.subscription.unsubscribe()
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
