import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userdashboard', component: UserDashboardComponent, canActivate: [AuthGuardComponent] },
  { path: 'sign-up', component: SignupComponent }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }