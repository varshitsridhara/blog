import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UserBlogDetailsComponent } from './user-blog-details/user-blog-details.component';

const routes: Routes = [
  { path: 'user-dashboard', component: UserDashboardComponent,canActivate: [AuthGuardComponent] },
  { path: 'new-post', component: NewPostComponent },
  { path: 'homepage', component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'blog-details/:id', component: BlogDetailsComponent },
  { path: 'blog-list',  component: BlogListComponent},
  { path: 'user-home',  component: BlogListComponent},
  { path: 'user-blog-details', component: UserBlogDetailsComponent},
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