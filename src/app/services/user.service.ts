import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  

  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data)
  }

  logout(): void {
    sessionStorage.clear();
  }

  registerPatient(usernameForm, passwordForm, typeForm, phoneForm, emailForm, nameForm, lastnameForm, addressForm, profilePictureForm){
    const data  = new FormData();
     
      data.append('username', usernameForm)
      data.append('password', passwordForm)
      data.append('type', typeForm)
      data.append('phone', phoneForm)
      data.append('email', emailForm)
      data.append('name', nameForm)
      data.append('lastname', lastnameForm)
      data.append('address', addressForm)
      data.append('profilePicture', profilePictureForm)
    

    return this.http.post(`${this.uri}/users/registerPatient`, data)
  }

  registerDoctor(usernameForm, passwordForm, typeForm, phoneForm, emailForm, agencyNameForm, addressForm, agencyNumberForm, descriptionForm){
    const data  = {
      username: usernameForm,
      password: passwordForm,
      type: typeForm,
      phone: phoneForm,
      email: emailForm,
      agencyName: agencyNameForm,
      address: addressForm,
      agencyNumber: agencyNumberForm,
      description: descriptionForm
    }

    return this.http.post(`${this.uri}/users/registerDoctor`, data)
  }

  tryChange(usernameForm, oldPasswordForm, newPasswordForm){
    const data = {
      username: usernameForm,
      oldPassword: oldPasswordForm,
      newPassword: newPasswordForm
    }

    return this.http.patch(`${this.uri}/users/passwordChange`, data)
  }

}
