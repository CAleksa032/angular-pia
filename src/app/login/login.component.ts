import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
        if(userFromDB.type == 0){
          this.message="Error"
        }
        else{
          const userString = JSON.stringify(userFromDB)
          sessionStorage.setItem("user", userString)
          if(userFromDB.type==1){
            if(userFromDB.approval==0){
              this.message = 'Waiting for approval.'
              sessionStorage.clear()

            }else if(userFromDB.approval==1){
            this.router.navigate(['patient']);
            }else{
              this.message = 'Sorry but your login has not been approved. Please contact support for more information.'
              sessionStorage.clear()
            }
          }
          else if(userFromDB.type == 2){
            this.router.navigate(['doctor']);
          }
      }}
      else{
        this.message="Wrong username or password"
      }
    })
  }
}
