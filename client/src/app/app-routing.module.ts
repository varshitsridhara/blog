import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { EditBlogComponent } from './edit-blo/edit-blo.component';

const routes: Routes = [
  { path: 'user-dashboard', component: UserDashboardComponent,canActivate: [AuthGuardComponent]},
  {path:'edit-blo/:id',component:EditBlogComponent,canActivate: [AuthGuardComponent]},
  { path: 'new-post', component: NewPostComponent,canActivate: [AuthGuardComponent] },
  { path: 'homepage', component: HomepageComponent  },
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'blog-details/:id', component: BlogDetailsComponent },
  { path: 'user-home',  component: UserHomeComponent},
  { path: 'user-blog-details', component: BlogDetailsComponent},
  { path: '', redirectTo: '/homepage', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }