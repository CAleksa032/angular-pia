import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Data } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean{
    if(route.data['requiredRole'] == '-5' && sessionStorage.length == 0){
      return true
    }
    if (sessionStorage.length != 0) {
      let userString = sessionStorage.getItem('user');
      let user = JSON.parse(userString) as User;

      
      console.log('User Type:', user.type.toString());
      console.log('required role:', route.data['requiredRole'])
      
      if(route.data['requiredRole'].includes(user.type.toString())){
        return true;
      }else{
        if(user.type==1){
          this.router.navigate(['patient']);
        }else if(user.type == 2){
          this.router.navigate(['doctor']);
        }else if(user.type == 0){
          this.router.navigate(['admin']);
        }  
        return false;
      }  
    } else {
      this.router.navigate(['/']);  // User is not logged in, redirect to the login page
      return false; 
    }
  }
  
}
