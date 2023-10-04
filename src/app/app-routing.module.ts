import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './register/register.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", component: LoginComponent, canActivate: [AuthGuard], data: {requiredRole: '-5'}},
  {path: "hiddenlogin", component: AdminLoginComponent, canActivate: [AuthGuard], data: {requiredRole: '-5'}},
  {path: "admin", component: AdminComponent, canActivate: [AuthGuard], data: {requiredRole: '0'}},
  {path: "patient", component: PatientComponent, canActivate: [AuthGuard], data: {requiredRole: '1'}},
  {path: "doctor", component: DoctorComponent, canActivate: [AuthGuard], data: {requiredRole: '2'}},
  {path: "register", component: RegisterComponent, canActivate: [AuthGuard], data: {requiredRole: '-5'}},
  {path: "passwordchange", component: PasswordChangeComponent, canActivate: [AuthGuard], data: {requiredRole: ['0','1','2']}},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard], data: {requiredRole: '-5'}},
  {path: '**', component: LoginComponent, canActivate: [AuthGuard], data: {requiredRole: '-5'}}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
